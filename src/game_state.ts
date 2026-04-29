import { AccountManager } from "./account.ts";
import { StationManager } from "./stations.ts";
import { TrainManager } from "./trains.ts";
import { TrackManager } from "./tracks.ts";
import { Passenger } from "./passengers.ts";
import {
  Account,
  GameState,
  Passenger as IPassenger,
  Station,
  Track,
  Train,
} from "./types.ts";

export class GameStateManager {
  private state: GameState;

  constructor() {
    this.state = {
      account: { balance: 10000, nextStationThreshold: 5000 },
      stations: [],
      trains: [],
      tracks: [],
      passengers: [],
      phase: { currentPhase: "start", unlockedStations: 4 },
      gameOver: false,
      endgameActive: false,
      endgameTimer: 0,
    };
  }

  getState(): GameState {
    return this.state;
  }

  // Update account balance
  updateBalance(amount: number): void {
    this.state.account.balance += amount;
  }

  // Check game over condition
  checkGameOver(): boolean {
    // Game over if no trains can run and player can't afford repairs
    const trains = this.state.trains;
    const tracks = this.state.tracks;

    const operationalTrains = trains.filter((t) => t.wearLevel < 100);
    const usableTracks = tracks.filter((t) => t.wearLevel < 100);

    if (operationalTrains.length === 0 && usableTracks.length === 0) {
      // Check if player can afford any repairs
      const canAffordRepairs = this.state.account.balance >= 100; // Simplified check
      if (!canAffordRepairs) {
        this.state.gameOver = true;
      }
    }

    return this.state.gameOver;
  }

  // Start endgame phase
  startEndgame(): void {
    this.state.endgameActive = true;
    this.state.endgameTimer = 120; // 2 minutes in seconds
  }

  // Update endgame timer
  updateEndgameTimer(deltaTime: number): void {
    if (this.state.endgameActive) {
      this.state.endgameTimer -= deltaTime;
      if (this.state.endgameTimer <= 0) {
        this.state.endgameActive = false;
        // Game ends, calculate final score
      }
    }
  }

  // Get final score
  getFinalScore(): number {
    return this.state.account.balance;
  }

  // Check if all 12 stations are unlocked
  checkAllStationsUnlocked(): boolean {
    return this.state.stations.length >= 12;
  }

  // Add a new station to the state
  addStation(station: Station): void {
    this.state.stations.push(station);
  }

  // Add a new train to the state
  addTrain(train: Train): void {
    this.state.trains.push(train);
  }

  // Add a new track to the state
  addTrack(track: Track): void {
    this.state.tracks.push(track);
  }

  // Add a new passenger to the state
  addPassenger(passenger: IPassenger): void {
    this.state.passengers.push(passenger);
  }
}
