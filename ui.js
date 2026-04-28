// UI update functions for the HTML interface

export function updateBalance(balance) {
  const el = document.getElementById("balance");
  if (el) el.textContent = balance;
}

export function updateStationCount(count) {
  const el = document.getElementById("stationCount");
  if (el) el.textContent = count;
}

export function updateTrainCount(count) {
  const el = document.getElementById("trainCount");
  if (el) el.textContent = count;
}

export function updatePhase(phase) {
  const el = document.getElementById("phase");
  if (el) el.textContent = phase;
}