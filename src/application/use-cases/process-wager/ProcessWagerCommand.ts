import { TransactionType } from "../../../domain/wager-transaction/WagerTransaction.js";

export interface ProcessWagerCommand {

  transactionId: string;

  walletId: string;

  type: TransactionType;

  amount: string;

  currency: string;

}