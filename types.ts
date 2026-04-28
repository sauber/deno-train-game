export interface GameEntity {
  id: string;
  name: string;
  type: "station" | "train" | "passenger";
}

export type StationSize = "small" | "medium" | "large";

export interface Station {
  id: string;
  name: string;
  color: string;
  size: StationSize;
  passengerCount: number;
  passengers: Passenger[];
}

export interface Passenger {
  id: string;
  destination: string;
  color: string;
  visible: boolean;
}

export interface Train {
  id: string;
  type: "regional" | "intercity" | "express";
  capacity: { min: number; max: number };
  currentPassengers: number;
  wearLevel: number;
  speed: number;
  age: number;
}

export interface Track {
  id: string;
  stations: string[];
  distance: number;
  wearLevel: number;
  repairCost: number;
  inUse: boolean;
}

export interface Account {
  balance: number;
  nextStationThreshold: number;
}

export interface GamePhase {
  currentPhase: "start" | "expansion" | "profit";
  unlockedStations: number;
}

export interface GameState {
  account: Account;
  stations: Station[];
  trains: Train[];
  tracks: Track[];
  passengers: Passenger[];
  phase: GamePhase;
  gameOver: boolean;
  endgameActive: boolean;
  endgameTimer: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface StationPosition extends Station {
  position: Position;
}

export interface TrainPosition extends Train {
  position: Position;
  currentTrack: string | null;
  targetStation: string | null;
}
