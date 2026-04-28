// UI rendering for the game (simplified for deno)

import { GameState } from "./types.ts";

export class UIRenderer {
  // Simplified renderer that doesn't use DOM types directly
  render(gameState: GameState): void {
    // In a real implementation, this would:
    // 1. Clear canvas
    // 2. Draw map with stations and tracks
    // 3. Draw control panel with stats
    // 4. Update visual elements

    // For now, we'll just log the state to console
    console.log("Rendering game state:");
    console.log(`- Balance: $${gameState.account.balance}`);
    console.log(`- Stations: ${gameState.stations.length}`);
    console.log(`- Trains: ${gameState.trains.length}`);
    console.log(`- Phase: ${gameState.phase.currentPhase}`);
    console.log(`- Stations count: ${gameState.stations.length}`);

    // In a real game, this would update the actual UI elements
  }
}
