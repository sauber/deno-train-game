import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { TrackManager } from "./tracks.ts";

Deno.test("TrackManager - create track", () => {
  const manager = new TrackManager();
  const track = manager.createTrack("station-1", "station-2", 100);
  assertEquals(track !== null, true);
  assertEquals(track?.stations.length, 2);
  assertEquals(track?.distance, 100);
});

Deno.test("TrackManager - duplicate track", () => {
  const manager = new TrackManager();
  manager.createTrack("station-1", "station-2", 100);
  const duplicate = manager.createTrack("station-1", "station-2", 100);
  assertEquals(duplicate, null);
});

Deno.test("TrackManager - apply wear", () => {
  const manager = new TrackManager();
  const track = manager.createTrack("station-1", "station-2", 100);
  if (track) {
    manager.applyWear(track.id, 10);
    assertEquals(track.wearLevel, 10);
    assertEquals(track.repairCost > 100, true);
  }
});

Deno.test("TrackManager - repair track", () => {
  const manager = new TrackManager();
  const track = manager.createTrack("station-1", "station-2", 100);
  if (track) {
    manager.applyWear(track.id, 50);
    manager.repairTrack(track.id);
    assertEquals(track.wearLevel, 0);
    assertEquals(track.repairCost, 100);
  }
});

Deno.test("TrackManager - calculate purchase cost", () => {
  const cost = TrackManager.calculatePurchaseCost(100);
  assertEquals(cost, 5000); // 100 * 50
});
