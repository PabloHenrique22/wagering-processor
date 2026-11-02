import { describe, expect, it } from "vitest";
import { Money } from "./Money.js";

describe("Money", () => {

  it("should create a valid money value", () => {
    const money = Money.from({
      amount: "100.00",
      currency: "BRL",
    });

    expect(money.toJSON()).toEqual({
      amount: "100.00",
      currency: "BRL",
    });
  });


  it("should reject empty amount", () => {
    expect(() =>
      Money.from({
        amount: "",
        currency: "BRL",
      }),
    ).toThrow();
  });


  it("should reject amount with more than two decimal places", () => {
    expect(() =>
      Money.from({
        amount: "10.999",
        currency: "BRL",
      }),
    ).toThrow();
  });


  it("should add two money values", () => {
    const moneyA = Money.from({
      amount: "100.00",
      currency: "BRL",
    });

    const moneyB = Money.from({
      amount: "50.00",
      currency: "BRL",
    });


    const result = moneyA.add(moneyB);


    expect(result.toJSON()).toEqual({
      amount: "150.00",
      currency: "BRL",
    });
  });


  it("should subtract two money values", () => {
    const moneyA = Money.from({
      amount: "100.00",
      currency: "BRL",
    });

    const moneyB = Money.from({
      amount: "30.00",
      currency: "BRL",
    });


    const result = moneyA.subtract(moneyB);


    expect(result.toJSON()).toEqual({
      amount: "70.00",
      currency: "BRL",
    });
  });


  it("should reject operations with different currencies", () => {
    const real = Money.from({
      amount: "100.00",
      currency: "BRL",
    });

    const dollar = Money.from({
      amount: "50.00",
      currency: "USD",
    });


    expect(() => real.add(dollar))
      .toThrow();
  });


  it("should check if money is positive", () => {
    const money = Money.from({
      amount: "100.00",
      currency: "BRL",
    });


    expect(money.isPositive()).toBe(true);
    expect(money.isNegative()).toBe(false);
  });


  it("should check if money is zero", () => {
    const money = Money.zero("BRL");


    expect(money.isZero()).toBe(true);
  });


});