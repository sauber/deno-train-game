// Game phase management

import { GameState } from "./types.ts";

export class PhaseManager {
  private gameState: GameState;

  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  // Get current phase
  getCurrentPhase(): string {
    return this.gameState.phase.currentPhase;
  }

  // Advance to next phase
  advancePhase(): void {
    const currentPhase = this.gameState.phase.currentPhase;

    switch (currentPhase) {
      case "start":
        // Remain in start until conditions are met
        break;
      case "expansion":
        // Remain in expansion until all 12 stations are reached
        break;
      case "profit":
        // Final phase
        break;
      default:
        // Reset to start if unknown phase
        this.gameState.phase.currentPhase = "start";
    }
  }

  // Check if expansion phase should be triggered
  checkShouldExpand(): boolean {
    const account = this.gameState.account;
    const nextThreshold = account.nextStationThreshold;
    return account.balance >= nextThreshold;
  }

  // Trigger expansion if conditions are met
  triggerExpansion(): void {
    if (this.checkShouldExpand()) {
      this.gameState.phase.currentPhase = "expansion";
    }
  }

  // Trigger profit phase when all stations are unlocked
  checkShouldEnterProfit(): boolean {
    return this.gameState.stations.length >= 12;
  }

  // Enter profit phase
  triggerProfitPhase(): void {
    if (this.checkShouldEnterProfit()) {
      this.gameState.phase.currentPhase = "profit";
    }
  }
}
