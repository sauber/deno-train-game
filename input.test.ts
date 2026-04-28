import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { InputHandler } from "./input.ts";
import { GameStateManager } from "./game_state.ts";

Deno.test("InputHandler - can be instantiated", () => {
  const gameStateManager = new GameStateManager();
  const gameState = gameStateManager.getState();
  const inputHandler = new InputHandler(gameState);
  assertEquals(inputHandler !== null, true);
});

Deno.test("InputHandler - handleInput method exists", () => {
  const gameStateManager = new GameStateManager();
  const gameState = gameStateManager.getState();
  const inputHandler = new InputHandler(gameState);
  assertEquals(typeof inputHandler.handleInput, "function");
});

Deno.test("InputHandler - isInMapArea returns true for upper area", () => {
  const gameStateManager = new GameStateManager();
  const gameState = gameStateManager.getState();
  const inputHandler = new InputHandler(gameState);
  // Test with coordinates in upper 2/3 of 800x600 canvas
  assertEquals(inputHandler.isInMapArea(100, 200, 800, 600), true);
});

Deno.test("InputHandler - isInMapArea returns false for lower area", () => {
  const gameStateManager = new GameStateManager();
  const gameState = gameStateManager.getState();
  const inputHandler = new InputHandler(gameState);
  // Test with coordinates in lower 1/3 of 800x600 canvas
  assertEquals(inputHandler.isInMapArea(100, 500, 800, 600), false);
});
