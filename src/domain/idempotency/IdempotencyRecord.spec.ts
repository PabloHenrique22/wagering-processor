import { describe, expect, it } from "vitest";
import {
  IdempotencyRecord,
  IdempotencyStatus,
} from "./IdempotencyRecord.js";


describe("IdempotencyRecord", () => {

  it("should create a processing record", () => {

    const record = IdempotencyRecord.create(
      "transaction-123",
    );


    expect(record.status)
      .toBe(IdempotencyStatus.PROCESSING);

    expect(record.key)
      .toBe("transaction-123");

  });


  it("should complete processing", () => {

    const record = IdempotencyRecord.create(
      "transaction-123",
    );


    record.complete();


    expect(record.status)
      .toBe(IdempotencyStatus.COMPLETED);


    expect(record.processedAt)
      .toBeDefined();

  });


  it("should mark as failed", () => {

    const record = IdempotencyRecord.create(
      "transaction-123",
    );


    record.fail();


    expect(record.status)
      .toBe(IdempotencyStatus.FAILED);

  });

});