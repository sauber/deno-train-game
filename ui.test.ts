import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { UIRenderer } from "./ui.ts";
import { GameStateManager } from "./game_state.ts";

Deno.test("UIRenderer - can be instantiated", () => {
  const gameStateManager = new GameStateManager();
  const gameState = gameStateManager.getState();
  const renderer = new UIRenderer();
  assertEquals(renderer !== null, true);
});

Deno.test("UIRenderer - render method exists", () => {
  const gameStateManager = new GameStateManager();
  const gameState = gameStateManager.getState();
  const renderer = new UIRenderer();
  // Just check that render method exists and can be called
  assertEquals(typeof renderer.render, "function");
});
