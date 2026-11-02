import { IdempotencyRecord } from "../../domain/idempotency/IdempotencyRecord.js";


export interface IdempotencyRepository {

  findByKey(
    key: string,
  ): Promise<IdempotencyRecord | null>;


  save(
    record: IdempotencyRecord,
  ): Promise<void>;

}