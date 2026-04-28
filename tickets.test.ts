import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { TicketManager } from "./tickets.ts";

Deno.test("TicketManager - calculate ticket price for regional", () => {
  const price = TicketManager.calculateTicketPrice(100, "regional");
  assertEquals(price, 200); // 100 * 2 * 1
});

Deno.test("TicketManager - calculate ticket price for intercity", () => {
  const price = TicketManager.calculateTicketPrice(100, "intercity");
  assertEquals(price, 300); // 100 * 2 * 1.5
});

Deno.test("TicketManager - calculate ticket price for express", () => {
  const price = TicketManager.calculateTicketPrice(100, "express");
  assertEquals(price, 400); // 100 * 2 * 2
});

Deno.test("TicketManager - calculate revenue", () => {
  const revenue = TicketManager.calculateRevenue(100, "express", 50);
  assertEquals(revenue, 20000); // 400 * 50
});

Deno.test("TicketManager - calculate potential revenue", () => {
  const potential = TicketManager.calculatePotentialRevenue(
    100,
    "intercity",
    30,
  );
  assertEquals(potential, 9000); // 300 * 30
});
