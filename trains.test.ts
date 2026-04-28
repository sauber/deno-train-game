import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { TrainManager } from "./trains.ts";

Deno.test("TrainManager - create regional train", () => {
  const manager = new TrainManager();
  const train = manager.createTrain("regional", "station-1");
  assertEquals(train !== null, true);
  assertEquals(train?.type, "regional");
  assertEquals(train?.capacity.min, 10);
  assertEquals(train?.capacity.max, 30);
  assertEquals(train?.speed, 60);
});

Deno.test("TrainManager - create intercity train", () => {
  const manager = new TrainManager();
  const train = manager.createTrain("intercity", "station-1");
  assertEquals(train !== null, true);
  assertEquals(train?.type, "intercity");
  assertEquals(train?.capacity.min, 20);
  assertEquals(train?.capacity.max, 60);
  assertEquals(train?.speed, 120);
});

Deno.test("TrainManager - create express train", () => {
  const manager = new TrainManager();
  const train = manager.createTrain("express", "station-1");
  assertEquals(train !== null, true);
  assertEquals(train?.type, "express");
  assertEquals(train?.capacity.min, 40);
  assertEquals(train?.capacity.max, 100);
  assertEquals(train?.speed, 200);
});

Deno.test("TrainManager - board passengers", () => {
  const manager = new TrainManager();
  const train = manager.createTrain("regional", "station-1");
  if (train) {
    const result = manager.boardPassengers(train.id, 25);
    assertEquals(result, true);
    assertEquals(train.currentPassengers, 25);
  }
});

Deno.test("TrainManager - board passengers exceeding capacity", () => {
  const manager = new TrainManager();
  const train = manager.createTrain("regional", "station-1");
  if (train) {
    const result = manager.boardPassengers(train.id, 50); // More than max capacity (30)
    assertEquals(result, true);
    assertEquals(train.currentPassengers, 30); // Should be capped at max
  }
});

Deno.test("TrainManager - can depart", () => {
  const manager = new TrainManager();
  const train = manager.createTrain("regional", "station-1");
  if (train) {
    // Initially should not be able to depart (min 10 passengers)
    assertEquals(manager.canDepart(train.id), false);

    // Board minimum passengers
    manager.boardPassengers(train.id, 10);
    assertEquals(manager.canDepart(train.id), true);
  }
});

Deno.test("TrainManager - apply wear", () => {
  const manager = new TrainManager();
  const train = manager.createTrain("regional", "station-1");
  if (train) {
    const originalSpeed = train.speed;
    manager.applyWear(train.id, 20);
    assertEquals(train.wearLevel, 20);
    assertEquals(train.speed < originalSpeed, true);
  }
});

Deno.test("TrainManager - repair train", () => {
  const manager = new TrainManager();
  const train = manager.createTrain("regional", "station-1");
  if (train) {
    manager.applyWear(train.id, 50);
    manager.repairTrain(train.id);
    assertEquals(train.wearLevel, 0);
    assertEquals(train.speed, 60); // Should be back to original speed
  }
});

Deno.test("TrainManager - get train cost", () => {
  assertEquals(TrainManager.getTrainCost("regional"), 5000);
  assertEquals(TrainManager.getTrainCost("intercity"), 15000);
  assertEquals(TrainManager.getTrainCost("express"), 30000);
});

Deno.test("TrainManager - calculate ticket price", () => {
  assertEquals(TrainManager.calculateTicketPrice(100, "regional"), 200); // 100 * 2 * 1
  assertEquals(TrainManager.calculateTicketPrice(100, "intercity"), 300); // 100 * 2 * 1.5
  assertEquals(TrainManager.calculateTicketPrice(100, "express"), 400); // 100 * 2 * 2
});
