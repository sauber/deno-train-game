import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { Passenger } from "./passengers.ts";

Deno.test("Passenger - create instance", () => {
  const passenger = new Passenger("p1", "Aarhus", "#FF0000", true);
  assertEquals(passenger.id, "p1");
  assertEquals(passenger.destination, "Aarhus");
  assertEquals(passenger.visible, true);
});

Deno.test("Passenger - generate static method", () => {
  const passenger = Passenger.generate("Odense", "#00FF00");
  assertEquals(passenger.destination, "Odense");
  assertEquals(passenger.color, "#00FF00");
  assertEquals(passenger.visible, true);
  assertEquals(passenger.id.length > 0, true);
});
