import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { RepairManager } from "./repair.ts";

Deno.test("RepairManager - calculate repair cost for track", () => {
  const cost = RepairManager.calculateRepairCost({ wearLevel: 50, age: 0 });
  assertEquals(cost, 150); // 100 * (1 + 50/100) * (1 + 0/100) = 100 * 1.5 * 1 = 150
});

Deno.test("RepairManager - calculate repair cost for aged element", () => {
  const cost = RepairManager.calculateRepairCost({ wearLevel: 0, age: 50 });
  assertEquals(cost, 150); // 100 * (1 + 0/100) * (1 + 50/100) = 100 * 1 * 1.5 = 150
});

Deno.test("RepairManager - calculate repair cost for worn and aged element", () => {
  const cost = RepairManager.calculateRepairCost({ wearLevel: 50, age: 50 });
  assertEquals(cost, 225); // 100 * (1 + 50/100) * (1 + 50/100) = 100 * 1.5 * 1.5 = 225
});