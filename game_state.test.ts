import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { GameStateManager } from "./game_state.ts";

Deno.test("GameStateManager - initial state", () => {
  const manager = new GameStateManager();
  const state = manager.getState();
  assertEquals(state.account.balance, 10000);
  assertEquals(state.stations.length, 0);
  assertEquals(state.trains.length, 0);
  assertEquals(state.phase.currentPhase, "start");
});

Deno.test("GameStateManager - update balance", () => {
  const manager = new GameStateManager();
  manager.updateBalance(500);
  assertEquals(manager.getState().account.balance, 10500);
});
