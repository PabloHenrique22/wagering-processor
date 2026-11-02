import Big from "big.js";

interface MoneyProps {
  amount: string;
  currency: string;
}

export class Money {
  private constructor(
    private readonly value: Big,
    public readonly currency: string,
  ) {}

  static from(props: MoneyProps): Money {
    Money.validateAmount(props.amount);

    if (!props.currency.trim()) {
      throw new Error("Currency cannot be empty");
    }

    return new Money(
      new Big(props.amount),
      props.currency,
    );
  }

  static zero(currency: string): Money {
    return Money.from({
      amount: "0.00",
      currency,
    });
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);

    return Money.from({
      amount: this.value
        .plus(other.value)
        .toFixed(2),
      currency: this.currency,
    });
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);

    return Money.from({
      amount: this.value
        .minus(other.value)
        .toFixed(2),
      currency: this.currency,
    });
  }

  negate(): Money {
    return Money.from({
      amount: this.value
        .times(-1)
        .toFixed(2),
      currency: this.currency,
    });
  }

  isZero(): boolean {
    return this.value.eq(0);
  }

  isPositive(): boolean {
    return this.value.gt(0);
  }

  isNegative(): boolean {
    return this.value.lt(0);
  }

  isLessThan(other: Money): boolean {
    this.assertSameCurrency(other);

    return this.value.lt(other.value);
  }

  equals(other: Money): boolean {
    return (
      this.currency === other.currency &&
      this.value.eq(other.value)
    );
  }

  toJSON(): MoneyProps {
    return {
      amount: this.value.toFixed(2),
      currency: this.currency,
    };
  }

  toString(): string {
    return `${this.value.toFixed(2)} ${this.currency}`;
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(
        "Cannot operate with different currencies",
      );
    }
  }

  private static validateAmount(amount: string): void {
    if (!amount.trim()) {
      throw new Error(
        "Amount cannot be empty",
      );
    }

    if (/e/i.test(amount)) {
      throw new Error(
        "Scientific notation is not allowed",
      );
    }

    if (!/^-?\d+(\.\d+)?$/.test(amount)) {
      throw new Error(
        "Invalid amount format",
      );
    }

    const decimals =
      amount.split(".")[1]?.length ?? 0;

    if (decimals > 2) {
      throw new Error(
        "Amount cannot have more than 2 decimal places",
      );
    }

    try {
      new Big(amount);
    } catch {
      throw new Error(
        "Invalid amount",
      );
    }
  }
}