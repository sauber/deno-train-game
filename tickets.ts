import { TrainManager } from "./trains.ts";

// Ticket pricing system

export class TicketManager {
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

  // Calculate total revenue from a journey
  static calculateRevenue(
    distance: number,
    trainType: "regional" | "intercity" | "express",
    passengers: number,
  ): number {
    const ticketPrice = this.calculateTicketPrice(distance, trainType);
    return ticketPrice * passengers;
  }

  // Calculate potential revenue for a track segment
  static calculatePotentialRevenue(
    trackDistance: number,
    trainType: "regional" | "intercity" | "express",
    expectedPassengers: number,
  ): number {
    const ticketPrice = this.calculateTicketPrice(trackDistance, trainType);
    return ticketPrice * expectedPassengers;
  }
}
