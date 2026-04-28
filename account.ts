import { Account } from "./types.ts";

export class AccountManager {
  private account: Account;

  constructor(initialBalance: number = 10000) {
    this.account = {
      balance: initialBalance,
      nextStationThreshold: 5000,
    };
  }

  getBalance(): number {
    return this.account.balance;
  }

  addMoney(amount: number): void {
    this.account.balance += amount;
  }

  subtractMoney(amount: number): void {
    this.account.balance -= amount;
    if (this.account.balance < 0) {
      this.account.balance = 0;
    }
  }

  canAfford(amount: number): boolean {
    return this.account.balance >= amount;
  }

  advanceToNextStationThreshold(): void {
    this.account.nextStationThreshold += 2500;
  }

  getNextStationThreshold(): number {
    return this.account.nextStationThreshold;
  }

  checkStationUnlock(): boolean {
    return this.account.balance >= this.account.nextStationThreshold;
  }
}
