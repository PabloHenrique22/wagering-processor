export enum IdempotencyStatus {
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}


export class IdempotencyRecord {

  private constructor(
    public readonly key: string,
    private _status: IdempotencyStatus,
    public readonly createdAt: Date,
    private _processedAt?: Date,
  ) {}


  static create(key: string): IdempotencyRecord {

    return new IdempotencyRecord(
      key,
      IdempotencyStatus.PROCESSING,
      new Date(),
    );
  }


  complete(): void {

    this._status = IdempotencyStatus.COMPLETED;
    this._processedAt = new Date();

  }


  fail(): void {

    this._status = IdempotencyStatus.FAILED;

  }


  get status(): IdempotencyStatus {

    return this._status;

  }


  get processedAt(): Date | undefined {

    return this._processedAt;

  }

}