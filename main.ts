// Main game loop

import { GameStateManager } from "./game_state.ts";
import { AccountManager } from "./account.ts";
import { StationManager } from "./stations.ts";
import { TrainManager } from "./trains.ts";
import { TrackManager } from "./tracks.ts";
import { TicketManager } from "./tickets.ts";
import { RepairManager } from "./repair.ts";
import { PhaseManager } from "./phases.ts";
import { UIRenderer } from "./ui.ts";
import { InputHandler } from "./input.ts";

export class Game {
  private gameStateManager: GameStateManager;
  private accountManager: AccountManager;
  private stationManager: StationManager;
  private trainManager: TrainManager;
  private trackManager: TrackManager;
  private phaseManager: PhaseManager;
  private uiRenderer: UIRenderer;
  private inputHandler: InputHandler;
  private isRunning: boolean = false;
  private lastTime: number = 0;

  constructor() {
    this.gameStateManager = new GameStateManager();
    this.accountManager = new AccountManager();
    this.stationManager = new StationManager();
    this.trainManager = new TrainManager();
    this.trackManager = new TrackManager();
    this.phaseManager = new PhaseManager(this.gameStateManager.getState());
    this.uiRenderer = new UIRenderer();
    this.inputHandler = new InputHandler(this.gameStateManager.getState());
  }

  // Start the game
  start(): void {
    this.isRunning = true;
    this.lastTime = Date.now();
    this.gameLoop();
  }

  // Main game loop
  private gameLoop(): void {
    if (!this.isRunning) return;

    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
    this.lastTime = currentTime;

    // Update game state
    this.update(deltaTime);

    // Render
    this.render();

    // Continue loop (using setTimeout for Deno compatibility)
    if (this.isRunning) {
      setTimeout(() => this.gameLoop(), 16); // ~60 FPS
    }
  }

  // Update game logic
  private update(deltaTime: number): void {
    // Update phase manager
    this.phaseManager.advancePhase();

    // Generate passengers
    const newPassengers = this.stationManager.generatePassengers();
    // In a real implementation, add these to the game state

    // Update trains (movement, boarding, alighting)
    // This would be expanded with actual train movement logic

    // Update endgame timer if active
    const gameState = this.gameStateManager.getState();
    if (gameState.endgameActive) {
      gameState.endgameTimer -= deltaTime;
      if (gameState.endgameTimer <= 0) {
        this.endGame();
      }
    }

    // Check game over condition
    if (this.gameStateManager.checkGameOver()) {
      this.gameOver();
    }
  }

  // Render the game
  private render(): void {
    const gameState = this.gameStateManager.getState();
    this.uiRenderer.render(gameState);
  }

  // Handle game over
  private gameOver(): void {
    console.log("Game Over!");
    this.isRunning = false;
  }

  // Handle end game
  private endGame(): void {
    const gameState = this.gameStateManager.getState();
    const finalScore = this.gameStateManager.getFinalScore();
    console.log(`Game Ended! Final Score: $${finalScore}`);
    this.isRunning = false;
  }

  // Stop the game
  stop(): void {
    this.isRunning = false;
  }
}
