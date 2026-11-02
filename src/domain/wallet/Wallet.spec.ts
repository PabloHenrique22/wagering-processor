import { describe, expect, it } from "vitest";
import { Wallet } from "./Wallet.js";
import { Money } from "../money/Money.js";


describe("Wallet", () => {


  it("should open a wallet with initial balance", () => {

    const wallet = Wallet.open({
      id: "wallet-1",
      playerId: "player-1",
      initialBalance: Money.from({
        amount: "100.00",
        currency: "BRL",
      }),
    });


    expect(wallet.balance.toJSON())
      .toEqual({
        amount: "100.00",
        currency: "BRL",
      });


    expect(wallet.version)
      .toBe(1);

  });



  it("should credit money into wallet", () => {

    const wallet = Wallet.open({
      id: "wallet-1",
      playerId: "player-1",
      initialBalance: Money.from({
        amount: "100.00",
        currency: "BRL",
      }),
    });


    wallet.credit(
      Money.from({
        amount: "50.00",
        currency: "BRL",
      }),
    );


    expect(wallet.balance.toJSON())
      .toEqual({
        amount: "150.00",
        currency: "BRL",
      });


    expect(wallet.version)
      .toBe(2);

  });



  it("should debit money from wallet", () => {

    const wallet = Wallet.open({
      id: "wallet-1",
      playerId: "player-1",
      initialBalance: Money.from({
        amount: "100.00",
        currency: "BRL",
      }),
    });


    wallet.debit(
      Money.from({
        amount: "30.00",
        currency: "BRL",
      }),
    );


    expect(wallet.balance.toJSON())
      .toEqual({
        amount: "70.00",
        currency: "BRL",
      });

  });



  it("should not allow negative balance", () => {

    const wallet = Wallet.open({
      id: "wallet-1",
      playerId: "player-1",
      initialBalance: Money.from({
        amount: "100.00",
        currency: "BRL",
      }),
    });


    expect(() =>
      wallet.debit(
        Money.from({
          amount: "150.00",
          currency: "BRL",
        }),
      ),
    ).toThrow(
      "Insufficient wallet balance",
    );

  });



  it("should not allow different currencies", () => {

    const wallet = Wallet.open({
      id: "wallet-1",
      playerId: "player-1",
      initialBalance: Money.from({
        amount: "100.00",
        currency: "BRL",
      }),
    });


    expect(() =>
      wallet.credit(
        Money.from({
          amount: "10.00",
          currency: "USD",
        }),
      ),
    ).toThrow(
      "Wallet currency mismatch",
    );

  });


});