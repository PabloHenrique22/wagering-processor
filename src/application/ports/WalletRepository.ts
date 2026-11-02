import { Wallet } from "../../domain/wallet/Wallet.js";


export interface WalletRepository {

  findById(id: string): Promise<Wallet | null>;

  save(wallet: Wallet): Promise<void>;

}