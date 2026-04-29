// UI rendering for the game (browser-side)

import { GameState } from "./types.ts";

// Export individual update functions for use in index.html
export function updateStationCount(count: number): void {
  const el = document.getElementById("stationCount");
  if (el) el.innerText = count.toString();
}

export function updateBalance(balance: number): void {
  const el = document.getElementById("balance");
  if (el) el.innerText = balance.toString();
}

export function updateTrainCount(count: number): void {
  const el = document.getElementById("trainCount");
  if (el) el.innerText = count.toString();
}

export function updatePhase(phase: string): void {
  const el = document.getElementById("phase");
  if (el) el.innerText = phase;
}

export function updateNextStation(threshold: number): void {
  const el = document.getElementById("nextStation");
  if (el) el.innerText = threshold.toString();
}

// UIRenderer class for use in main.ts
export class UIRenderer {
  render(gameState: GameState): void {
    updateBalance(gameState.account.balance);
    updateStationCount(gameState.stations.length);
    updateTrainCount(gameState.trains.length);
    updatePhase(gameState.phase.currentPhase);
    updateNextStation(gameState.account.nextStationThreshold);
  }
}
