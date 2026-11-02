import { ProcessWagerCommand } from "./ProcessWagerCommand.js";
import { WalletRepository } from "../../ports/WalletRepository.js";
import { WagerTransactionRepository } from "../../ports/WagerTransactionRepository.js";
import { IdempotencyRepository } from "../../ports/IdempotencyRepository.js";


export class ProcessWagerUseCase {


  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly transactionRepository: WagerTransactionRepository,
    private readonly idempotencyRepository: IdempotencyRepository,
  ) {}


  async execute(
    command: ProcessWagerCommand,
  ): Promise<void> {

  }

}