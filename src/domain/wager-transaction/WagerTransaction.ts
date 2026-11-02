import { Money } from "../money/Money.js";

export enum TransactionType {
  BET = "BET",
  WIN = "WIN",
  LOSS = "LOSS",
  REFUND = "REFUND",
  ROLLBACK = "ROLLBACK",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  PROCESSED = "PROCESSED",
  REJECTED = "REJECTED",
}

export class WagerTransaction {

  private constructor(
    public readonly id: string,
    public readonly walletId: string,
    public readonly type: TransactionType,
    public readonly amount: Money,
    private _status: TransactionStatus,
    public readonly createdAt: Date,
  ) {}

  static create(props: {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: Money;
}): WagerTransaction {

  return new WagerTransaction(
    props.id,
    props.walletId,
    props.type,
    props.amount,
    TransactionStatus.PENDING,
    new Date(),
  );
}

    static rehydrate(state: {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: Money;
  status: TransactionStatus;
  createdAt: Date;
}): WagerTransaction {

  return new WagerTransaction(
    state.id,
    state.walletId,
    state.type,
    state.amount,
    state.status,
    state.createdAt,
  );
}

    get status(): TransactionStatus {
  return this._status;
}

markAsProcessed(): void {

  if (this._status !== TransactionStatus.PENDING) {
    throw new Error(
      "Only pending transactions can be processed",
    );
  }

  this._status = TransactionStatus.PROCESSED;
}

}