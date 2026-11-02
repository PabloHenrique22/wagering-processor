# Wagering Processor

Technical challenge implementation for a distributed wagering processor.

## Overview

This project implements the core domain of a wagering transaction processor.

The main focus is keeping financial rules protected inside the domain layer, ensuring consistency when processing wallet transactions.

The solution was designed using Domain-Driven Design (DDD) concepts.

## Architecture

The project follows a layered architecture:

```text
src
├── domain
│   ├── money
│   │   └── Money
│   │
│   ├── wallet
│   │   └── Wallet
│   │
│   ├── wager-transaction
│   │   └── WagerTransaction
│   │
│   └── idempotency
│       └── IdempotencyRecord
│
└── application
    └── use-cases
        └── process-wager
            └── ProcessWagerUseCase
```

## Domain Design


## Money (Value Object)
Responsible for monetary operations and financial rules.

Features:
- Decimal precision handling
- Currency validation
- Addition and subtraction operations
- Prevention of invalid monetary states


## Wallet (Aggregate Root)


Responsible for maintaining wallet consistency.

Responsibilities:
- Manage balance changes
- Validate debit operations
- Protect wallet invariants


## WagerTransaction (Domain Entity)


Represents wagering financial events:
- BET
- WIN
- LOSS
- REFUND
- ROLLBACK


## IdempotencyRecord


Responsible for preventing duplicated transaction processing.

## Technologies
- TypeScript
- NestJS
- Vitest
- Node.js

## Installation

Install dependencies:

```bash
npm install
```

## Running tests

Run automated tests:

```bash
npm run test
```

Current status:

- 21 tests passing
- Domain entities covered with automated tests

## Future Improvements

Possible next steps:

- PostgreSQL persistence
- Repository implementations
- AWS SQS integration
- Outbox pattern
- Distributed transaction processing
- Concurrency control