import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { GameStateManager } from "./game_state.ts";
import { PhaseManager } from "./phases.ts";

Deno.test("PhaseManager - initial phase", () => {
  const gameStateManager = new GameStateManager();
  const gameState = gameStateManager.getState();
  const phaseManager = new PhaseManager(gameState);

  assertEquals(phaseManager.getCurrentPhase(), "start");
});

Deno.test("PhaseManager - check should expand", () => {
  const gameStateManager = new GameStateManager();
  const gameState = gameStateManager.getState();
  const phaseManager = new PhaseManager(gameState);

  // Initial balance is 10000, threshold is 5000
  assertEquals(phaseManager.checkShouldExpand(), true);
});

Deno.test("PhaseManager - trigger expansion", () => {
  const gameStateManager = new GameStateManager();
  const gameState = gameStateManager.getState();
  const phaseManager = new PhaseManager(gameState);

  phaseManager.triggerExpansion();
  assertEquals(gameState.phase.currentPhase, "expansion");
});
