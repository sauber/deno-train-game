import { Passenger as IPassenger } from "./types.ts";

export class Passenger implements IPassenger {
  constructor(
    public id: string,
    public destination: string,
    public color: string,
    public visible: boolean = true,
  ) {}

  static generate(destination: string, color: string): Passenger {
    return new Passenger(
      `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      destination,
      color,
      true,
    );
  }
}
