import { describe, expect, it } from "vitest";
import { Money } from "../money/Money.js";
import {
  TransactionStatus,
  TransactionType,
  WagerTransaction,
} from "./WagerTransaction.js";

describe("WagerTransaction", () => {

  it("should create a pending transaction", () => {

    const transaction = WagerTransaction.create({
      id: "transaction-1",
      walletId: "wallet-1",
      type: TransactionType.BET,
      amount: Money.from({
        amount: "50.00",
        currency: "BRL",
      }),
    });


    expect(transaction.status)
      .toBe(TransactionStatus.PENDING);

    expect(transaction.type)
      .toBe(TransactionType.BET);

  });


  it("should process a pending transaction", () => {

    const transaction = WagerTransaction.create({
      id: "transaction-1",
      walletId: "wallet-1",
      type: TransactionType.BET,
      amount: Money.from({
        amount: "50.00",
        currency: "BRL",
      }),
    });


    transaction.markAsProcessed();


    expect(transaction.status)
      .toBe(TransactionStatus.PROCESSED);

  });


  it("should not process an already processed transaction", () => {

    const transaction = WagerTransaction.create({
      id: "transaction-1",
      walletId: "wallet-1",
      type: TransactionType.BET,
      amount: Money.from({
        amount: "50.00",
        currency: "BRL",
      }),
    });


    transaction.markAsProcessed();


    expect(() => {
      transaction.markAsProcessed();
    }).toThrow();

  });

});