import { describe, expect, it } from "vitest";
import { ProcessWagerUseCase } from "./ProcessWagerUseCase.js";
import { TransactionType } from "../../../domain/wager-transaction/WagerTransaction.js";


describe("ProcessWagerUseCase", () => {


  it("should process a wager command", async () => {

    const useCase = new ProcessWagerUseCase(
      {
        findById: async () => null,
        save: async () => {},
      },
      {
        save: async () => {},
      },
      {
        findByKey: async () => null,
        save: async () => {},
      },
    );


    const command = {
      transactionId: "tx-123",
      walletId: "wallet-123",
      type: TransactionType.BET,
      amount: "50.00",
      currency: "BRL",
    };


    await expect(
      useCase.execute(command),
    ).resolves.not.toThrow();

  });


});