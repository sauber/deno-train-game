import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { Game } from "./main.ts";

Deno.test("Game - can be instantiated", () => {
  const game = new Game();
  assertEquals(game !== null, true);
});

Deno.test("Game - has start method", () => {
  const game = new Game();
  assertEquals(typeof game.start, "function");
});

Deno.test("Game - has stop method", () => {
  const game = new Game();
  assertEquals(typeof game.stop, "function");
});
