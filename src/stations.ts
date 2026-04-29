import { Station, StationSize } from "./types.ts";
import { Passenger } from "./passengers.ts";

export class StationManager {
  private stations: Station[] = [];
  private passengerGeneratorRate: number = 0; // Passengers per second

  constructor() {
    // Initialize with 5 stations named after Danish cities
    const danishCities = [
      "København",
      "Aarhus",
      "Odense",
      "Aalborg",
      "Esbjerg",
      "Randers",
      "Kolding",
      "Horsens",
      "Vejle",
      "Herning",
      "Silkeborg",
      "Roskilde",
    ];

    for (let i = 0; i < 4; i++) {
      const city = danishCities[i];
      const station: Station = {
        id: `station-${i}`,
        name: city,
        color: this.generateRandomColor(),
        size: this.determineStationSize(i),
        passengerCount: 0,
        passengers: [],
      };
      this.stations.push(station);
    }

    this.updatePassengerGenerationRate();
  }

  private generateRandomColor(): string {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F3FF33",
      "#FF33F3",
      "#33FFF5",
      "#FFD700",
      "#8B4513",
      "#2E8B57",
      "#6A5ACD",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private determineStationSize(index: number): StationSize {
    // Size scaling based on position/index
    if (index < 2) return "small";
    if (index < 5) return "medium";
    return "large";
  }

  getStations(): Station[] {
    return this.stations;
  }

  getStationById(id: string): Station | undefined {
    return this.stations.find((s) => s.id === id);
  }

  addPassengerToStation(stationId: string, passenger: Passenger): void {
    const station = this.getStationById(stationId);
    if (station) {
      station.passengers.push(passenger);
      station.passengerCount++;
    }
  }

  generatePassengers(): Passenger[] {
    const newPassengers: Passenger[] = [];

    // Generate passengers based on station size and current passenger count
    this.stations.forEach((station) => {
      const baseRate = 0.1; // Base passengers per second
      const sizeMultiplier = {
        small: 1,
        medium: 1.5,
        large: 2.5,
      }[station.size];

      const totalPassengers = Math.floor(baseRate * sizeMultiplier * 60); // per minute

      for (let i = 0; i < totalPassengers; i++) {
        const destinationIndex = Math.floor(
          Math.random() * this.stations.length,
        );
        const destinationStation = this.stations[destinationIndex];
        const passenger = Passenger.generate(
          destinationStation.name,
          destinationStation.color,
        );
        newPassengers.push(passenger);
      }
    });

    return newPassengers;
  }

  updatePassengerGenerationRate(): void {
    const totalPassengers = this.stations.reduce(
      (sum, station) => sum + station.passengers.length,
      0,
    );
    this.passengerGeneratorRate = 0.1 + (totalPassengers * 0.001);
  }

  // Called when game phase advances
  onPhaseAdvance(newPhase: string): void {
    if (newPhase === "expansion" && this.stations.length < 12) {
      const danishCities = [
        "København",
        "Aarhus",
        "Odense",
        "Aalborg",
        "Esbjerg",
        "Randers",
        "Kolding",
        "Horsens",
        "Vejle",
        "Herning",
        "Silkeborg",
        "Roskilde",
      ];
      const availableCities = danishCities.filter((city) =>
        !this.stations.some((s) => s.name === city)
      );
      const newStationCount = Math.min(
        12 - this.stations.length,
        availableCities.length,
      );
      for (let i = 0; i < newStationCount; i++) {
        const city = availableCities[i];
        const station: Station = {
          id: `station-${this.stations.length + i}`,
          name: city,
          color: this.generateRandomColor(),
          size: this.determineStationSize(this.stations.length + i),
          passengerCount: 0,
          passengers: [],
        };
        this.stations.push(station);
      }
      this.updatePassengerGenerationRate();
    }
  }
}
