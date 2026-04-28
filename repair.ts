import { TrackManager } from "./tracks.ts";
import { TrainManager } from "./trains.ts";

// Repair system

export class RepairManager {
  // Calculate repair cost based on wear and age
  static calculateRepairCost(
    element: { wearLevel: number; age: number },
  ): number {
    // Base cost + wear-based cost + age-based cost
    const baseCost = 100;
    const wearMultiplier = 1 + (element.wearLevel / 100);
    const ageMultiplier = 1 + (element.age / 100); // Age in years
    return Math.floor(baseCost * wearMultiplier * ageMultiplier);
  }

  // Repair a track
  static repairTrack(trackId: string, trackManager: TrackManager): boolean {
    const track = trackManager.getTrackById(trackId);
    if (track && track.wearLevel > 0) {
      const cost = this.calculateRepairCost({
        wearLevel: track.wearLevel,
        age: 0,
      }); // New tracks don't age
      // In a real game, you'd check if player can afford this
      track.wearLevel = 0;
      return true;
    }
    return false;
  }

  // Repair a train
  static repairTrain(trainId: string, trainManager: TrainManager): boolean {
    const train = trainManager.getTrainById(trainId);
    if (train && train.wearLevel > 0) {
      const cost = this.calculateRepairCost({
        wearLevel: train.wearLevel,
        age: train.age,
      });
      // In a real game, you'd check if player can afford this
      train.wearLevel = 0;
      train.age = 0; // Reset age after repair
      return true;
    }
    return false;
  }
}
