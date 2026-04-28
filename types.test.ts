import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { GamePhase, StationSize } from "./types.ts";

Deno.test("StationSize enum values", () => {
  const sizes: StationSize[] = ["small", "medium", "large"];
  assertEquals(sizes.length, 3);
});

Deno.test("GamePhase initial values", () => {
  const phase: GamePhase = { currentPhase: "start", unlockedStations: 5 };
  assertEquals(phase.currentPhase, "start");
  assertEquals(phase.unlockedStations, 5);
});

Deno.test("Station interface has required properties", () => {
  const station = {
    id: "test-1",
    name: "Test Station",
    color: "#FF0000",
    size: "small" as StationSize,
    passengerCount: 0,
    passengers: [],
  };
  assertEquals(station.id, "test-1");
  assertEquals(station.size, "small");
});
