import { Money } from "../money/Money.js";


export class Wallet {

  private constructor(
    public readonly id: string,
    public readonly playerId: string,
    private _balance: Money,
    private _version: number,
    public readonly createdAt: Date,
    private _updatedAt: Date,
  ) {}

    static rehydrate(state: {
        id: string;
        playerId: string;
        balance: Money;
        version: number;
        createdAt: Date;
        updatedAt: Date;
        }): Wallet {

        return new Wallet(
            state.id,
            state.playerId,
            state.balance,
            state.version,
            state.createdAt,
            state.updatedAt,
        );

    }


  static open(props: {
    id: string;
    playerId: string;
    initialBalance: Money;
  }): Wallet {

    return new Wallet(
      props.id,
      props.playerId,
      props.initialBalance,
      1,
      new Date(),
      new Date(),
    );

  }


  get balance(): Money {
    return this._balance;
  }


  get version(): number {
    return this._version;
  }


  get updatedAt(): Date {
    return this._updatedAt;
  }


  credit(amount: Money): void {

    this.assertSameCurrency(amount);


    this._balance = this._balance.add(amount);

    this.incrementVersion();

  }


  debit(amount: Money): void {

    this.assertSameCurrency(amount);


    if (this._balance.isLessThan(amount)) {
      throw new Error(
        "Insufficient wallet balance",
      );
    }


    this._balance = this._balance.subtract(amount);

    this.incrementVersion();

  }



  private assertSameCurrency(amount: Money): void {

    if (
      this._balance.toJSON().currency !==
      amount.toJSON().currency
    ) {
      throw new Error(
        "Wallet currency mismatch",
      );
    }

  }



  private incrementVersion(): void {

    this._version += 1;
    this._updatedAt = new Date();

  }

}