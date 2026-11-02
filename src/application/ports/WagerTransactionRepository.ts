import { WagerTransaction } from "../../domain/wager-transaction/WagerTransaction.js";


export interface WagerTransactionRepository {

  save(
    transaction: WagerTransaction,
  ): Promise<void>;

}