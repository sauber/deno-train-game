// UI update functions for the game
export function updateStationCount(count) {
  const el = document.getElementById('stationCount');
  if (el) el.innerText = count.toString();
}

export function updateBalance(balance) {
  const el = document.getElementById('balance');
  if (el) el.innerText = balance.toString();
}

export function updateTrainCount(count) {
  const el = document.getElementById('trainCount');
  if (el) el.innerText = count.toString();
}

export function updatePhase(phase) {
  const el = document.getElementById('phase');
  if (el) el.innerText = phase;
}

export function updateNextStation(threshold) {
  const el = document.getElementById('nextStation');
  if (el) el.innerText = threshold.toString();
}

// Render function called by main.ts
export function render(gameState) {
  updateBalance(gameState.account.balance);
  updateStationCount(gameState.stations.length);
  updateTrainCount(gameState.trains.length);
  updatePhase(gameState.phase.currentPhase);
  updateNextStation(gameState.account.nextStationThreshold);
}