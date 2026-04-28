import { Train } from "./types.ts";

export class TrainManager {
  private trains: Train[] = [];

  constructor() {}

  // Create a new train of specified type
  createTrain(
    type: "regional" | "intercity" | "express",
    stationId: string,
  ): Train | null {
    const trainConfig = this.getTrainConfig(type);
    const train: Train = {
      id: `train-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: type,
      capacity: trainConfig.capacity,
      currentPassengers: 0,
      wearLevel: 0,
      speed: trainConfig.speed,
      age: 0, // Initialize age to 0
    };

    this.trains.push(train);
    return train;
  }

  // Get train configuration based on type
  private getTrainConfig(type: "regional" | "intercity" | "express") {
    const configs = {
      regional: {
        capacity: { min: 10, max: 30 },
        speed: 60, // km/h
        cost: 5000,
      },
      intercity: {
        capacity: { min: 20, max: 60 },
        speed: 120, // km/h
        cost: 15000,
      },
      express: {
        capacity: { min: 40, max: 100 },
        speed: 200, // km/h
        cost: 30000,
      },
    };
    return configs[type];
  }

  // Get all trains
  getTrains(): Train[] {
    return this.trains;
  }

  // Get train by ID
  getTrainById(id: string): Train | undefined {
    return this.trains.find((t) => t.id === id);
  }

  // Board passengers onto a train
  boardPassengers(trainId: string, passengers: number): boolean {
    const train = this.getTrainById(trainId);
    if (!train) return false;

    const availableSpace = train.capacity.max - train.currentPassengers;
    const passengersToBoard = Math.min(passengers, availableSpace);

    train.currentPassengers += passengersToBoard;
    return passengersToBoard > 0;
  }

  // Alight passengers from a train
  alightPassengers(trainId: string, passengers: number): number {
    const train = this.getTrainById(trainId);
    if (!train) return 0;

    const passengersToAlight = Math.min(passengers, train.currentPassengers);
    train.currentPassengers -= passengersToAlight;
    return passengersToAlight;
  }

  // Check if train can depart (minimum passengers met)
  canDepart(trainId: string): boolean {
    const train = this.getTrainById(trainId);
    return train ? train.currentPassengers >= train.capacity.min : false;
  }

  // Apply wear to a train
  applyWear(trainId: string, wearAmount: number = 1): void {
    const train = this.getTrainById(trainId);
    if (train) {
      train.wearLevel = Math.min(100, train.wearLevel + wearAmount);
      // Speed decreases with wear
      const speedPenalty = train.wearLevel / 100 * 0.5; // Up to 50% speed reduction
      train.speed = this.getTrainConfig(train.type).speed * (1 - speedPenalty);
    }
  }

  // Repair a train
  repairTrain(trainId: string): boolean {
    const train = this.getTrainById(trainId);
    if (train && train.wearLevel > 0) {
      train.wearLevel = 0;
      train.speed = this.getTrainConfig(train.type).speed;
      return true;
    }
    return false;
  }

  // Check if train is operational (not fully worn)
  isTrainOperational(trainId: string): boolean {
    const train = this.getTrainById(trainId);
    return train ? train.wearLevel < 100 : false;
  }

  // Get train cost based on type
  static getTrainCost(type: "regional" | "intercity" | "express"): number {
    const configs = {
      regional: 5000,
      intercity: 15000,
      express: 30000,
    };
    return configs[type];
  }

  // Calculate ticket price based on distance and train type
  static calculateTicketPrice(
    distance: number,
    trainType: "regional" | "intercity" | "express",
  ): number {
    const basePrice = distance * 2; // Base price per km
    const typeMultiplier = {
      regional: 1,
      intercity: 1.5,
      express: 2,
    };
    return Math.floor(basePrice * typeMultiplier[trainType]);
  }

  // Find best next station for a train based on potential revenue
  findBestNextStation(
    trainId: string,
    availableStations: string[],
    tracks: any[],
  ): string | null {
    const train = this.getTrainById(trainId);
    if (!train) return null;

    let bestStation = null;
    let maxRevenue = 0;

    for (const stationId of availableStations) {
      // Calculate potential revenue from this station
      const revenue = this.calculatePotentialRevenue(
        trainId,
        stationId,
        tracks,
      );
      if (revenue > maxRevenue) {
        maxRevenue = revenue;
        bestStation = stationId;
      }
    }

    return bestStation;
  }

  // Calculate potential revenue from a station
  private calculatePotentialRevenue(
    trainId: string,
    stationId: string,
    tracks: any[],
  ): number {
    // This is a simplified calculation - in a real game, you'd consider:
    // - Number of passengers waiting at the station
    // - Distance to the station
    // - Train capacity
    const baseRevenue = 100; // Base revenue
    const passengerBonus = 50; // Bonus for passengers
    return baseRevenue + passengerBonus;
  }

  // Remove a train
  removeTrain(trainId: string): boolean {
    const trainIndex = this.trains.findIndex((t) => t.id === trainId);
    if (trainIndex !== -1) {
      this.trains.splice(trainIndex, 1);
      return true;
    }
    return false;
  }
}
