# Escrow/Wallet System Backend Implementation Prompt

## Overview

This document outlines the backend implementation requirements for the Evermount Capital wallet/escrow system. The wallet acts as an escrow account where users can safely store funds before investing, withdraw profits, and manage their available balance separately from invested funds.

## Core Concept

- **Wallet/Escrow**: A secure holding account for user funds
- **Available Balance**: Funds in wallet available for withdrawal or investment
- **Invested Balance**: Funds currently in active investments
- **Total Balance**: Available Balance + Invested Balance
- **Pending Balance**: Funds in pending transactions (deposits/withdrawals)

## Database Schema

### Wallets Table
```sql
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  available_balance DECIMAL(20, 2) NOT NULL DEFAULT 0.00,
  pending_balance DECIMAL(20, 2) NOT NULL DEFAULT 0.00,
  locked_balance DECIMAL(20, 2) NOT NULL DEFAULT 0.00, -- For pending investments
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, currency)
);

CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_wallets_currency ON wallets(currency);
```

### Wallet Transactions Table
```sql
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- deposit, withdrawal, investment, profit-withdrawal, transfer-to-investment, dividend, fee, refund
  amount DECIMAL(20, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed, cancelled
  description TEXT,
  metadata JSONB, -- Store additional info like method, reference, investment_id, etc.
  related_transaction_id UUID, -- Link to deposit/withdrawal/investment records
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE INDEX idx_wallet_transactions_wallet_id ON wallet_transactions(wallet_id);
CREATE INDEX idx_wallet_transactions_user_id ON wallet_transactions(user_id);
CREATE INDEX idx_wallet_transactions_type ON wallet_transactions(type);
CREATE INDEX idx_wallet_transactions_status ON wallet_transactions(status);
CREATE INDEX idx_wallet_transactions_created_at ON wallet_transactions(created_at);
```

### Update Deposits Table
Add wallet transaction reference:
```sql
ALTER TABLE deposits ADD COLUMN wallet_transaction_id UUID REFERENCES wallet_transactions(id);
```

### Update Withdrawals Table
Add wallet transaction reference:
```sql
ALTER TABLE withdrawals ADD COLUMN wallet_transaction_id UUID REFERENCES wallet_transactions(id);
```

### Update Investments Table
Add wallet transaction references:
```sql
ALTER TABLE investments ADD COLUMN wallet_transaction_id UUID REFERENCES wallet_transactions(id);
ALTER TABLE investments ADD COLUMN profit_withdrawal_transaction_id UUID REFERENCES wallet_transactions(id);
```

---

## API Endpoints

### 1. Wallet Balance

#### 1.1 Get Wallet Balance
**Endpoint**: `GET /wallets/balance`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "totalBalance": 50000.00,
  "availableBalance": 45000.00,
  "pendingBalance": 5000.00,
  "investedBalance": 50000.00,
  "lockedBalance": 0.00,
  "currency": "USD",
  "wallets": [
    {
      "id": "uuid",
      "type": "main",
      "availableBalance": 45000.00,
      "pendingBalance": 5000.00,
      "currency": "USD"
    }
  ]
}
```

**Business Logic**:
- Calculate `totalBalance` = `availableBalance` + `investedBalance`
- `availableBalance` = funds available for withdrawal or investment
- `pendingBalance` = funds in pending deposits/withdrawals
- `investedBalance` = sum of all active investment amounts
- `lockedBalance` = funds locked in pending investment transfers

**Implementation Notes**:
- Automatically create wallet for user if it doesn't exist
- Support multiple currencies (USD, EUR, BTC, ETH, etc.)
- Calculate invested balance from active investments table
- Calculate pending balance from pending transactions

---

### 2. Wallet Transaction History

#### 2.1 Get Wallet History
**Endpoint**: `GET /wallets/history`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `type` (optional): deposit, withdrawal, investment, profit-withdrawal, transfer-to-investment, dividend, fee
- `status` (optional): pending, processing, completed, failed
- `startDate` (optional): 2024-01-01 (ISO format)
- `endDate` (optional): 2024-12-31 (ISO format)
- `page` (optional): 1 (default)
- `limit` (optional): 20 (default, max 100)

**Response** (200 OK):
```json
{
  "transactions": [
    {
      "id": "uuid",
      "type": "deposit",
      "amount": 10000.00,
      "currency": "USD",
      "status": "completed",
      "description": "Card deposit via Stripe",
      "metadata": {
        "method": "card",
        "reference": "dep_123456",
        "depositId": "uuid"
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "completedAt": "2024-01-01T00:05:00Z"
    },
    {
      "id": "uuid",
      "type": "transfer-to-investment",
      "amount": 5000.00,
      "currency": "USD",
      "status": "completed",
      "description": "Transferred to Investment: Quant Strategy Alpha",
      "metadata": {
        "investmentId": "uuid",
        "investmentOptionId": "uuid",
        "strategy": "quant-alpha"
      },
      "createdAt": "2024-01-02T00:00:00Z",
      "completedAt": "2024-01-02T00:00:01Z"
    },
    {
      "id": "uuid",
      "type": "profit-withdrawal",
      "amount": 1500.00,
      "currency": "USD",
      "status": "completed",
      "description": "Profit withdrawal from Investment: Quant Strategy Alpha",
      "metadata": {
        "investmentId": "uuid",
        "originalInvestment": 5000.00,
        "profit": 1500.00
      },
      "createdAt": "2024-01-15T00:00:00Z",
      "completedAt": "2024-01-15T00:00:01Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5
}
```

**Business Logic**:
- Filter by user's wallet only
- Support pagination
- Sort by `created_at` DESC (newest first)
- Include related transaction metadata
- Calculate totals for pagination

---

### 3. Transfer to Investment

#### 3.1 Transfer Funds from Wallet to Investment
**Endpoint**: `POST /wallets/transfer-to-investment`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "amount": 5000.00,
  "investmentOptionId": "uuid",
  "strategy": "quant-alpha",
  "currency": "USD"
}
```

**Response** (200 OK):
```json
{
  "walletTransactionId": "uuid",
  "investmentId": "uuid",
  "amount": 5000.00,
  "currency": "USD",
  "status": "completed",
  "message": "Funds transferred to investment successfully"
}
```

**Business Logic**:
1. Validate user has sufficient available balance
2. Validate investment option exists and is active
3. Check minimum investment amount
4. Create wallet transaction (type: `transfer-to-investment`, status: `pending`)
5. Lock the amount in wallet (`lockedBalance += amount`)
6. Create investment record
7. Update wallet: `availableBalance -= amount`, `lockedBalance -= amount`
8. Update wallet transaction status to `completed`
9. Link investment to wallet transaction

**Validation**:
- Amount must be > 0
- Amount must not exceed available balance
- Investment option must be active
- User must have completed KYC (if required)
- Minimum investment amount check

**Error Responses**:
- `400 Bad Request`: Insufficient balance, invalid amount, invalid investment option
- `403 Forbidden`: KYC not completed, account suspended
- `500 Internal Server Error`: Database error, transaction rollback

---

### 4. Withdraw Profit to Wallet

#### 4.1 Withdraw Profit from Investment to Wallet
**Endpoint**: `POST /wallets/withdraw-profit`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "amount": 1500.00,
  "investmentId": "uuid",
  "reason": "Partial profit withdrawal",
  "currency": "USD"
}
```

**Response** (200 OK):
```json
{
  "walletTransactionId": "uuid",
  "investmentId": "uuid",
  "amount": 1500.00,
  "currency": "USD",
  "remainingInvestment": 5000.00,
  "status": "completed",
  "message": "Profit withdrawn to wallet successfully"
}
```

**Business Logic**:
1. Validate investment exists and belongs to user
2. Validate investment is active
3. Calculate available profit (current value - original investment)
4. Validate withdrawal amount doesn't exceed available profit
5. Check if withdrawal would violate minimum investment requirements
6. Create wallet transaction (type: `profit-withdrawal`, status: `pending`)
7. Update investment: reduce investment amount, update profit withdrawal transaction ID
8. Update wallet: `availableBalance += amount`
9. Update wallet transaction status to `completed`
10. If investment amount reaches zero, close the investment

**Validation**:
- Amount must be > 0
- Investment must be active
- Amount must not exceed available profit
- Minimum investment amount must remain (if applicable)
- Investment must belong to user

**Error Responses**:
- `400 Bad Request`: Invalid amount, insufficient profit, minimum investment violation
- `404 Not Found`: Investment not found
- `403 Forbidden`: Investment doesn't belong to user
- `500 Internal Server Error`: Database error

---

## Integration with Existing Endpoints

### 5. Update Deposit Endpoints

#### 5.1 Card Deposit Integration
When a card deposit is completed:
1. Create wallet transaction (type: `deposit`, status: `pending`)
2. Update wallet: `pendingBalance += amount`
3. When payment confirmed:
   - Update wallet: `pendingBalance -= amount`, `availableBalance += amount`
   - Update wallet transaction: status = `completed`, `completedAt = NOW()`
   - Link deposit record to wallet transaction

#### 5.2 Crypto Deposit Integration
When a crypto deposit is confirmed:
1. Create wallet transaction (type: `deposit`, status: `pending`)
2. Update wallet: `pendingBalance += amount`
3. When blockchain confirms:
   - Update wallet: `pendingBalance -= amount`, `availableBalance += amount`
   - Update wallet transaction: status = `completed`
   - Link deposit record to wallet transaction

#### 5.3 Bank Deposit Integration
Similar flow to card/crypto deposits with bank transfer confirmation.

---

### 6. Update Withdrawal Endpoints

#### 6.1 Bank Withdrawal Integration
When a bank withdrawal is initiated:
1. Validate sufficient available balance
2. Create wallet transaction (type: `withdrawal`, status: `pending`)
3. Update wallet: `availableBalance -= amount`, `pendingBalance += amount`
4. When withdrawal processed:
   - Update wallet: `pendingBalance -= amount`
   - Update wallet transaction: status = `completed`
   - Link withdrawal record to wallet transaction

#### 6.2 Crypto Withdrawal Integration
Similar flow to bank withdrawal with blockchain transaction tracking.

---

### 7. Investment Profit Distribution

#### 7.1 Automatic Profit Distribution
When an investment generates profit:
1. Calculate profit amount
2. Option 1: Auto-withdraw to wallet
   - Create wallet transaction (type: `dividend`, status: `completed`)
   - Update wallet: `availableBalance += profit`
3. Option 2: Reinvest profit
   - Add profit to investment amount
   - Create wallet transaction (type: `dividend`, status: `completed`) for tracking

---

## Business Rules

### 8. Wallet Operations Rules

1. **Minimum Balance**: No minimum balance required for wallet
2. **Maximum Balance**: Check against user tier limits
3. **Currency Support**: Support multiple currencies (USD, EUR, BTC, ETH, USDT)
4. **Transaction Limits**: 
   - Daily withdrawal limit based on KYC status
   - Maximum single transaction based on user tier
5. **Fee Structure**:
   - No fees for deposits to wallet
   - Withdrawal fees apply (bank, crypto network fees)
   - No fees for transferring to investments
6. **Lock Mechanism**: Lock funds during investment transfer to prevent double-spending

### 9. Investment Transfer Rules

1. **Minimum Investment**: Enforce minimum investment amount per strategy
2. **Maximum Investment**: Check against available balance and strategy limits
3. **Atomic Transactions**: Use database transactions to ensure consistency
4. **Rollback**: If investment creation fails, refund to wallet immediately

### 10. Profit Withdrawal Rules

1. **Partial Withdrawal**: Allow partial profit withdrawal
2. **Minimum Investment**: Ensure minimum investment amount remains after withdrawal
3. **Profit Calculation**: Use current investment value - original investment amount
4. **Tax Reporting**: Track profit withdrawals for tax reporting

---

## Security & Validation

### 11. Security Requirements

1. **Authentication**: All endpoints require valid JWT token
2. **Authorization**: Users can only access their own wallet
3. **Rate Limiting**: Apply rate limits to prevent abuse
4. **Input Validation**: Validate all amounts, IDs, and parameters
5. **SQL Injection Prevention**: Use parameterized queries
6. **Transaction Integrity**: Use database transactions for multi-step operations
7. **Audit Logging**: Log all wallet transactions for audit trail
8. **Balance Verification**: Verify balances before and after transactions

### 12. Validation Rules

1. **Amount Validation**:
   - Must be positive number
   - Must have max 2 decimal places (for fiat) or 8 (for crypto)
   - Must not exceed available balance
   - Must meet minimum requirements

2. **Currency Validation**:
   - Must be supported currency
   - Must match wallet currency (or create new wallet)

3. **Investment Validation**:
   - Investment option must exist and be active
   - User must meet investment requirements (KYC, minimum balance)
   - Strategy must be available

---

## Error Handling

### 13. Error Response Format

All errors should follow this format:
```json
{
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient available balance",
    "details": {
      "availableBalance": 1000.00,
      "requestedAmount": 5000.00
    }
  }
}
```

### 14. Common Error Codes

- `INSUFFICIENT_BALANCE`: Not enough available balance
- `INVALID_AMOUNT`: Invalid amount provided
- `INVALID_INVESTMENT_OPTION`: Investment option not found or inactive
- `MINIMUM_INVESTMENT_VIOLATION`: Amount below minimum investment
- `INVESTMENT_NOT_FOUND`: Investment doesn't exist
- `INSUFFICIENT_PROFIT`: Profit amount insufficient for withdrawal
- `WALLET_NOT_FOUND`: User wallet doesn't exist
- `CURRENCY_MISMATCH`: Currency doesn't match wallet currency
- `TRANSACTION_FAILED`: Database transaction failed
- `UNAUTHORIZED`: User not authorized for this operation

---

## Database Transactions

### 15. Transaction Flow Example (Transfer to Investment)

```sql
BEGIN TRANSACTION;

-- 1. Lock wallet row
SELECT * FROM wallets WHERE user_id = $1 AND currency = $2 FOR UPDATE;

-- 2. Validate balance
-- Check available_balance >= amount

-- 3. Create wallet transaction
INSERT INTO wallet_transactions (wallet_id, user_id, type, amount, currency, status, metadata)
VALUES ($1, $2, 'transfer-to-investment', $3, $4, 'pending', $5)
RETURNING id;

-- 4. Update wallet
UPDATE wallets 
SET available_balance = available_balance - $3,
    locked_balance = locked_balance + $3,
    updated_at = NOW()
WHERE id = $1;

-- 5. Create investment
INSERT INTO investments (user_id, investment_option_id, amount, status, wallet_transaction_id)
VALUES ($1, $2, $3, 'active', $4)
RETURNING id;

-- 6. Update wallet transaction
UPDATE wallet_transactions
SET status = 'completed',
    completed_at = NOW(),
    metadata = jsonb_set(metadata, '{investmentId}', $1::text::jsonb)
WHERE id = $2;

-- 7. Unlock wallet
UPDATE wallets
SET locked_balance = locked_balance - $3,
    updated_at = NOW()
WHERE id = $1;

COMMIT;
```

---

## Background Jobs

### 16. Scheduled Tasks

1. **Balance Reconciliation**: Daily job to verify wallet balances match transaction sums
2. **Pending Transaction Cleanup**: Clean up stuck pending transactions after timeout
3. **Profit Calculation**: Calculate and update investment profits
4. **Currency Conversion**: Update multi-currency wallet balances based on exchange rates

---

## Testing Requirements

### 17. Unit Tests

- Wallet balance calculation
- Transaction creation and status updates
- Balance validation logic
- Investment transfer logic
- Profit withdrawal logic

### 18. Integration Tests

- Complete deposit flow (card, crypto, bank)
- Complete withdrawal flow (bank, crypto)
- Investment transfer flow
- Profit withdrawal flow
- Concurrent transaction handling
- Error scenarios and rollbacks

### 19. Edge Cases

- Insufficient balance scenarios
- Concurrent transactions
- Network failures during transactions
- Database connection failures
- Invalid investment options
- Minimum investment violations

---

## API Documentation

### 20. OpenAPI/Swagger Specification

Include all endpoints in OpenAPI specification with:
- Request/response schemas
- Authentication requirements
- Error responses
- Example requests/responses

---

## Implementation Priority

### Phase 1 (Critical)
1. Wallet balance endpoint
2. Wallet transaction history endpoint
3. Deposit integration (update existing endpoints)
4. Withdrawal integration (update existing endpoints)

### Phase 2 (High Priority)
5. Transfer to investment endpoint
6. Profit withdrawal endpoint
7. Database schema implementation
8. Transaction integrity and rollback

### Phase 3 (Enhancement)
9. Multi-currency support
10. Background jobs
11. Advanced filtering and reporting
12. Performance optimization

---

## Notes

- All amounts should be stored as DECIMAL(20, 2) for precision
- Use database transactions for all multi-step operations
- Implement proper logging for audit trail
- Consider implementing a wallet service class to encapsulate business logic
- Add indexes for performance on frequently queried columns
- Implement caching for wallet balances (with cache invalidation on transactions)
- Consider implementing event-driven architecture for transaction notifications

---

## Example Service Implementation (Pseudocode)

```typescript
class WalletService {
  async getBalance(userId: string, currency: string): Promise<WalletBalance> {
    // Get or create wallet
    // Calculate invested balance from investments
    // Calculate pending balance from transactions
    // Return balance object
  }

  async transferToInvestment(
    userId: string,
    amount: number,
    investmentOptionId: string
  ): Promise<WalletTransaction> {
    // Start database transaction
    // Validate balance
    // Lock wallet
    // Create wallet transaction
    // Update wallet balance
    // Create investment
    // Commit transaction
    // Return transaction
  }

  async withdrawProfit(
    userId: string,
    investmentId: string,
    amount: number
  ): Promise<WalletTransaction> {
    // Start database transaction
    // Validate investment and profit
    // Create wallet transaction
    // Update investment
    // Update wallet balance
    // Commit transaction
    // Return transaction
  }
}
```

---

This implementation ensures a robust, secure, and scalable wallet/escrow system that properly separates available funds from invested funds while maintaining transaction integrity and providing comprehensive audit trails.


