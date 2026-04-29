import { assertEquals } from "@std/assert";
import { StationManager } from "./stations.ts";
import { Passenger } from "./passengers.ts";

Deno.test("StationManager - initial stations", () => {
  const manager = new StationManager();
  const stations = manager.getStations();
  assertEquals(stations.length, 4);
  assertEquals(stations[0].name, "København");
});

Deno.test("StationManager - generate passengers", () => {
  const manager = new StationManager();
  const passengers = manager.generatePassengers();
  assertEquals(passengers.length > 0, true);
  assertEquals(passengers[0] instanceof Passenger, true);
});

Deno.test("StationManager - get station by id", () => {
  const manager = new StationManager();
  const station = manager.getStationById("station-0");
  assertEquals(station !== undefined, true);
  assertEquals(station?.name, "København");
});
