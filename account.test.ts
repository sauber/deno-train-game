import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { AccountManager } from "./account.ts";

Deno.test("AccountManager - initial balance", () => {
  const account = new AccountManager(5000);
  assertEquals(account.getBalance(), 5000);
});

Deno.test("AccountManager - add money", () => {
  const account = new AccountManager(1000);
  account.addMoney(500);
  assertEquals(account.getBalance(), 1500);
});

Deno.test("AccountManager - subtract money", () => {
  const account = new AccountManager(1000);
  account.subtractMoney(300);
  assertEquals(account.getBalance(), 700);
});

Deno.test("AccountManager - can afford", () => {
  const account = new AccountManager(1000);
  assertEquals(account.canAfford(500), true);
  assertEquals(account.canAfford(1500), false);
});

Deno.test("AccountManager - check station unlock", () => {
  const account = new AccountManager(6000);
  assertEquals(account.checkStationUnlock(), true);
});
