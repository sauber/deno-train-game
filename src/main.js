// Main game loop
import { GameStateManager } from "./game_state.js";
import { AccountManager } from "./account.js";
import { StationManager } from "./stations.js";
import { TrainManager } from "./trains.js";
import { TrackManager } from "./tracks.js";
import { TicketManager } from "./tickets.js";
import { RepairManager } from "./repair.js";
import { PhaseManager } from "./phases.js";
import { render } from "./ui.js";
import { InputHandler } from "./input.js";

export class Game {
  constructor() {
    this.gameStateManager = new GameStateManager();
    this.accountManager = new AccountManager();
    this.stationManager = new StationManager();
    this.trainManager = new TrainManager();
    this.trackManager = new TrackManager();

    // Sync stations from StationManager to GameState
    const stations = this.stationManager.getStations();
    stations.forEach((station) => {
      this.gameStateManager.addStation(station);
    });

    this.phaseManager = new PhaseManager(this.gameStateManager.getState());
    this.inputHandler = new InputHandler(this.gameStateManager.getState());
  }

  // Expose gameStateManager for browser usage
  getGameStateManager() {
    return this.gameStateManager;
  }

  // Get the current game state
  getState() {
    return this.gameStateManager.getState();
  }

  // Start the game
  start() {
    this.isRunning = true;
    this.lastTime = Date.now();
    this.gameLoop();
  }

  // Main game loop
  gameLoop() {
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
  update(deltaTime) {
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
  render() {
    const gameState = this.gameStateManager.getState();
    render(gameState);
  }

  // Handle game over
  gameOver() {
    console.log("Game Over!");
    this.isRunning = false;
  }

  // Handle end game
  endGame() {
    const gameState = this.gameStateManager.getState();
    const finalScore = this.gameStateManager.getFinalScore();
    console.log(`Game Ended! Final Score: $${finalScore}`);
    this.isRunning = false;
  }

  // Stop the game
  stop() {
    this.isRunning = false;
  }
}