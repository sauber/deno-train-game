import { Track } from "./types.ts";

export class TrackManager {
  private tracks: Track[] = [];

  constructor() {}

  // Create a new track between two stations
  createTrack(
    station1Id: string,
    station2Id: string,
    distance: number,
  ): Track | null {
    // Check if track already exists between these stations
    const existingTrack = this.tracks.find(
      (t) => (t.stations.includes(station1Id) &&
        t.stations.includes(station2Id))
    );

    if (existingTrack) {
      return null; // Track already exists
    }

    const track: Track = {
      id: `track-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      stations: [station1Id, station2Id],
      distance: distance,
      wearLevel: 0, // 0 = new, 100 = fully worn
      repairCost: this.calculateRepairCost(0),
      inUse: false,
    };

    this.tracks.push(track);
    return track;
  }

  // Get all tracks
  getTracks(): Track[] {
    return this.tracks;
  }

  // Get track by ID
  getTrackById(id: string): Track | undefined {
    return this.tracks.find((t) => t.id === id);
  }

  // Get tracks connected to a station
  getTracksForStation(stationId: string): Track[] {
    return this.tracks.filter((t) => t.stations.includes(stationId));
  }

  // Apply wear to a track when a train passes
  applyWear(trackId: string, wearAmount: number = 1): void {
    const track = this.getTrackById(trackId);
    if (track) {
      track.wearLevel = Math.min(100, track.wearLevel + wearAmount);
      track.repairCost = this.calculateRepairCost(track.wearLevel);
    }
  }

  // Calculate repair cost based on wear level
  calculateRepairCost(wearLevel: number): number {
    // Base cost + additional cost based on wear
    const baseCost = 100;
    const wearMultiplier = 1 + (wearLevel / 100);
    return Math.floor(baseCost * wearMultiplier);
  }

  // Repair a track
  repairTrack(trackId: string): boolean {
    const track = this.getTrackById(trackId);
    if (track && track.wearLevel > 0) {
      track.wearLevel = 0;
      track.repairCost = this.calculateRepairCost(0);
      return true;
    }
    return false;
  }

  // Check if track is usable (not fully worn)
  isTrackUsable(trackId: string): boolean {
    const track = this.getTrackById(trackId);
    return track ? track.wearLevel < 100 : false;
  }

  // Get speed penalty for a track based on wear
  getSpeedPenalty(trackId: string): number {
    const track = this.getTrackById(trackId);
    if (!track) return 0;
    // Speed reduced linearly with wear: 0% at 0 wear, 50% at 100 wear
    return track.wearLevel / 100 * 0.5;
  }

  // Set track in use
  setTrackInUse(trackId: string, inUse: boolean): void {
    const track = this.getTrackById(trackId);
    if (track) {
      track.inUse = inUse;
    }
  }

  // Remove a track (only if not in use)
  removeTrack(trackId: string): boolean {
    const track = this.getTrackById(trackId);
    if (track && !track.inUse) {
      this.tracks = this.tracks.filter((t) => t.id !== trackId);
      return true;
    }
    return false;
  }

  // Calculate purchase cost based on distance
  static calculatePurchaseCost(distance: number): number {
    // Cost = distance * base rate
    const baseRate = 50;
    return Math.floor(distance * baseRate);
  }
}
