# Backend API Endpoints Implementation Prompt

## Overview
This document outlines all API endpoints required to support the Evermount Capital frontend application. The backend should be built using modern best practices with proper authentication, validation, error handling, and security measures.

**Base URL**: `https://api.evermount.co`

---

## 1. Authentication & User Management

### 1.1 User Registration
**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fullName": "John Doe"
}
```

**Response** (201 Created):
```json
{
  "message": "Account created successfully. Please check your email to verify.",
  "userId": "uuid"
}
```

**Requirements**:
- Validate email format
- Enforce password strength (min 8 chars, uppercase, number, special char)
- Hash password using bcrypt
- Send verification email
- Check for duplicate emails
- Return appropriate error messages

---

### 1.2 User Login
**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response** (200 OK):
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "user",
    "isVerified": true
  }
}
```

**Requirements**:
- Validate credentials
- Generate JWT token (expires in 24 hours)
- Return user profile data
- Handle invalid credentials gracefully

---

### 1.3 Social Authentication
**Endpoints**:
- `POST /auth/google`
- `POST /auth/github`
- `POST /auth/x` (Twitter/X)
- `POST /auth/apple`

**Request Body**:
```json
{
  "accessToken": "oauth_token",
  "idToken": "id_token_for_apple"
}
```

**Response**: Same as login endpoint

**Requirements**:
- Verify OAuth tokens
- Create user if doesn't exist
- Link social accounts to existing users
- Return JWT token

---

### 1.4 Password Reset Request
**Endpoint**: `POST /auth/send-reset-password`

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** (200 OK):
```json
{
  "message": "Password reset link sent to your email"
}
```

**Requirements**:
- Generate secure reset token
- Send reset email with link
- Token expires in 1 hour
- Don't reveal if email exists (security)

---

### 1.5 Password Reset
**Endpoint**: `POST /auth/reset-password`

**Request Body**:
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePassword123!"
}
```

**Response** (200 OK):
```json
{
  "message": "Password reset successfully"
}
```

**Requirements**:
- Validate reset token
- Check token expiration
- Update password
- Invalidate token after use

---

### 1.6 Email Verification
**Endpoint**: `POST /auth/verify-email`

**Request Body**:
```json
{
  "token": "verification_token_from_email"
}
```

**Response** (200 OK):
```json
{
  "message": "Email verified successfully"
}
```

---

### 1.7 Refresh Token
**Endpoint**: `POST /auth/refresh`

**Request Headers**:
```
Authorization: Bearer <refresh_token>
```

**Response** (200 OK):
```json
{
  "token": "new_jwt_token"
}
```

---

## 2. User Profile & Settings

### 2.1 Get User Profile
**Endpoint**: `GET /users/profile`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "kycStatus": "verified",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

---

### 2.2 Update User Profile
**Endpoint**: `PUT /users/profile`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "fullName": "John Doe Updated",
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response** (200 OK):
```json
{
  "message": "Profile updated successfully",
  "user": { /* updated user object */ }
}
```

---

### 2.3 Change Password
**Endpoint**: `PUT /users/change-password`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!"
}
```

**Response** (200 OK):
```json
{
  "message": "Password changed successfully"
}
```

---

### 2.4 Update Email
**Endpoint**: `PUT /users/email`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "newEmail": "newemail@example.com",
  "password": "CurrentPassword123!"
}
```

**Response** (200 OK):
```json
{
  "message": "Verification email sent to new address"
}
```

---

### 2.5 Upload Profile Picture
**Endpoint**: `POST /users/profile-picture`

**Headers**: `Authorization: Bearer <token>`

**Request**: `multipart/form-data` with image file

**Response** (200 OK):
```json
{
  "message": "Profile picture updated",
  "imageUrl": "https://cdn.evermount.co/users/uuid/profile.jpg"
}
```

---

### 2.6 Delete Account
**Endpoint**: `DELETE /users/account`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "password": "CurrentPassword123!"
}
```

**Response** (200 OK):
```json
{
  "message": "Account deleted successfully"
}
```

---

## 3. KYC (Know Your Customer) & Compliance

### 3.1 Submit KYC Documents
**Endpoint**: `POST /kyc/submit`

**Headers**: `Authorization: Bearer <token>`

**Request**: `multipart/form-data`
- `identityDocument` (file)
- `proofOfAddress` (file)
- `selfie` (file)

**Response** (200 OK):
```json
{
  "message": "KYC documents submitted successfully",
  "kycId": "uuid",
  "status": "pending"
}
```

---

### 3.2 Get KYC Status
**Endpoint**: `GET /kyc/status`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "status": "verified", // pending, verified, rejected
  "submittedAt": "2024-01-01T00:00:00Z",
  "verifiedAt": "2024-01-02T00:00:00Z",
  "rejectionReason": null
}
```

---

### 3.3 Admin: Get All KYC Submissions
**Endpoint**: `GET /admin/kyc`

**Headers**: `Authorization: Bearer <admin_token>`

**Query Parameters**:
- `status` (optional): pending, verified, rejected
- `page` (optional): 1
- `limit` (optional): 20

**Response** (200 OK):
```json
{
  "kycSubmissions": [
    {
      "id": "uuid",
      "userId": "uuid",
      "userEmail": "user@example.com",
      "status": "pending",
      "submittedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

---

### 3.4 Admin: Approve/Reject KYC
**Endpoint**: `PUT /admin/kyc/:kycId`

**Headers**: `Authorization: Bearer <admin_token>`

**Request Body**:
```json
{
  "status": "verified", // or "rejected"
  "notes": "All documents verified"
}
```

**Response** (200 OK):
```json
{
  "message": "KYC status updated"
}
```

---

## 4. Wallets & Balance

### 4.1 Get Wallet Balance
**Endpoint**: `GET /wallets/balance`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "totalBalance": 50000.00,
  "availableBalance": 45000.00,
  "pendingBalance": 5000.00,
  "currency": "USD",
  "wallets": [
    {
      "id": "uuid",
      "type": "main",
      "balance": 50000.00,
      "currency": "USD"
    }
  ]
}
```

---

### 4.2 Get Wallet History
**Endpoint**: `GET /wallets/history`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `type` (optional): deposit, withdrawal, investment, dividend
- `startDate` (optional): 2024-01-01
- `endDate` (optional): 2024-12-31
- `page` (optional): 1
- `limit` (optional): 20

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
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

---

## 5. Deposits

### 5.1 Initiate Card Deposit
**Endpoint**: `POST /deposits/card`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "amount": 1000.00,
  "currency": "USD",
  "cardToken": "stripe_card_token",
  "saveCard": false
}
```

**Response** (200 OK):
```json
{
  "depositId": "uuid",
  "amount": 1000.00,
  "status": "pending",
  "paymentIntent": "stripe_payment_intent_id"
}
```

---

### 5.2 Initiate Crypto Deposit
**Endpoint**: `POST /deposits/crypto`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "amount": 0.5,
  "currency": "BTC",
  "walletAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
}
```

**Response** (200 OK):
```json
{
  "depositId": "uuid",
  "amount": 0.5,
  "currency": "BTC",
  "status": "pending",
  "depositAddress": "bc1q...",
  "qrCode": "data:image/png;base64,..."
}
```

---

### 5.3 Initiate Bank Deposit
**Endpoint**: `POST /deposits/bank`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "amount": 5000.00,
  "currency": "USD",
  "bankAccountId": "uuid",
  "reference": "DEP-2024-001"
}
```

**Response** (200 OK):
```json
{
  "depositId": "uuid",
  "amount": 5000.00,
  "status": "pending",
  "bankDetails": {
    "bankName": "Evermount Capital Bank",
    "accountNumber": "1234567890",
    "routingNumber": "123456789",
    "swiftCode": "EVERUS33"
  },
  "reference": "DEP-2024-001"
}
```

---

### 5.4 Get Deposit Status
**Endpoint**: `GET /deposits/:depositId`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "id": "uuid",
  "amount": 1000.00,
  "currency": "USD",
  "type": "card",
  "status": "completed", // pending, processing, completed, failed
  "createdAt": "2024-01-01T00:00:00Z",
  "completedAt": "2024-01-01T00:05:00Z"
}
```

---

### 5.5 Get All Deposits
**Endpoint**: `GET /deposits`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `status` (optional): pending, completed, failed
- `page` (optional): 1
- `limit` (optional): 20

**Response**: Array of deposit objects

---

## 6. Withdrawals

### 6.1 Initiate Bank Withdrawal
**Endpoint**: `POST /withdrawals/bank`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "amount": 2000.00,
  "currency": "USD",
  "bankAccountId": "uuid",
  "reason": "Personal use"
}
```

**Response** (200 OK):
```json
{
  "withdrawalId": "uuid",
  "amount": 2000.00,
  "status": "pending",
  "estimatedCompletion": "2024-01-03T00:00:00Z",
  "fee": 5.00
}
```

---

### 6.2 Initiate Crypto Withdrawal
**Endpoint**: `POST /withdrawals/crypto`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "amount": 0.1,
  "currency": "BTC",
  "walletAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "network": "bitcoin"
}
```

**Response** (200 OK):
```json
{
  "withdrawalId": "uuid",
  "amount": 0.1,
  "currency": "BTC",
  "status": "pending",
  "networkFee": 0.0001,
  "estimatedCompletion": "2024-01-01T01:00:00Z"
}
```

---

### 6.3 Get Withdrawal Status
**Endpoint**: `GET /withdrawals/:withdrawalId`

**Headers**: `Authorization: Bearer <token>`

**Response**: Similar to deposit status

---

### 6.4 Get All Withdrawals
**Endpoint**: `GET /withdrawals`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**: Same as deposits

---

### 6.5 Cancel Withdrawal
**Endpoint**: `POST /withdrawals/:withdrawalId/cancel`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "message": "Withdrawal cancelled successfully"
}
```

---

## 7. Investments & Portfolio

### 7.1 Get Investment Options
**Endpoint**: `GET /investments/options`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `category` (optional): forex, stocks, commodities, crypto

**Response** (200 OK):
```json
{
  "options": [
    {
      "id": "uuid",
      "name": "Bitcoin",
      "symbol": "BTC",
      "category": "crypto",
      "currentPrice": 45000.00,
      "change24h": 2.5,
      "minInvestment": 100.00,
      "riskLevel": "high"
    }
  ]
}
```

---

### 7.2 Create Investment
**Endpoint**: `POST /investments`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "investmentOptionId": "uuid",
  "amount": 5000.00,
  "strategy": "long_term" // long_term, short_term, day_trading
}
```

**Response** (200 OK):
```json
{
  "investmentId": "uuid",
  "amount": 5000.00,
  "status": "active",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

### 7.3 Get Portfolio
**Endpoint**: `GET /portfolio`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "totalValue": 50000.00,
  "totalInvested": 45000.00,
  "totalReturn": 5000.00,
  "totalReturnPercent": 11.11,
  "holdings": [
    {
      "id": "uuid",
      "assetName": "Bitcoin",
      "symbol": "BTC",
      "quantity": 1.2,
      "averagePrice": 40000.00,
      "currentPrice": 45000.00,
      "value": 54000.00,
      "return": 6000.00,
      "returnPercent": 12.5
    }
  ]
}
```

---

### 7.4 Get Portfolio Performance
**Endpoint**: `GET /portfolio/performance`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `period` (optional): 1d, 7d, 30d, 90d, 1y, all

**Response** (200 OK):
```json
{
  "period": "30d",
  "totalReturn": 5000.00,
  "totalReturnPercent": 11.11,
  "dailyReturns": [
    { "date": "2024-01-01", "return": 100.00 },
    { "date": "2024-01-02", "return": 150.00 }
  ],
  "metrics": {
    "sharpeRatio": 1.85,
    "maxDrawdown": 0.35,
    "volatility": 0.12
  }
}
```

---

### 7.5 Close Investment
**Endpoint**: `POST /investments/:investmentId/close`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "reason": "Taking profits"
}
```

**Response** (200 OK):
```json
{
  "message": "Investment closed successfully",
  "finalValue": 5500.00,
  "return": 500.00
}
```

---

## 8. Transactions

### 8.1 Get Transaction History
**Endpoint**: `GET /transactions`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `type` (optional): deposit, withdrawal, investment, dividend, fee
- `status` (optional): pending, completed, failed
- `startDate` (optional): 2024-01-01
- `endDate` (optional): 2024-12-31
- `page` (optional): 1
- `limit` (optional): 20

**Response** (200 OK):
```json
{
  "transactions": [
    {
      "id": "uuid",
      "type": "investment",
      "amount": 5000.00,
      "currency": "USD",
      "status": "completed",
      "description": "Invested in Bitcoin",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

---

### 8.2 Get Transaction Details
**Endpoint**: `GET /transactions/:transactionId`

**Headers**: `Authorization: Bearer <token>`

**Response**: Full transaction object with all details

---

## 9. Admin Endpoints

### 9.1 Get All Users
**Endpoint**: `GET /admin/users`

**Headers**: `Authorization: Bearer <admin_token>`

**Query Parameters**:
- `status` (optional): active, inactive, suspended
- `role` (optional): user, admin
- `search` (optional): search by email or name
- `page` (optional): 1
- `limit` (optional): 20

**Response** (200 OK):
```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "user",
      "status": "active",
      "kycStatus": "verified",
      "totalDeposits": 50000.00,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1000,
  "page": 1,
  "limit": 20
}
```

---

### 9.2 Create User (Admin)
**Endpoint**: `POST /admin/users`

**Headers**: `Authorization: Bearer <admin_token>`

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "password": "TemporaryPassword123!",
  "fullName": "Jane Doe",
  "role": "user"
}
```

**Response** (201 Created):
```json
{
  "message": "User created successfully",
  "user": { /* user object */ }
}
```

---

### 9.3 Update User (Admin)
**Endpoint**: `PUT /admin/users/:userId`

**Headers**: `Authorization: Bearer <admin_token>`

**Request Body**:
```json
{
  "fullName": "Updated Name",
  "role": "admin",
  "status": "active"
}
```

---

### 9.4 Suspend/Activate User
**Endpoint**: `POST /admin/users/:userId/suspend`

**Headers**: `Authorization: Bearer <admin_token>`

**Request Body**:
```json
{
  "action": "suspend", // or "activate"
  "reason": "Violation of terms"
}
```

---

### 9.5 Delete User
**Endpoint**: `DELETE /admin/users/:userId`

**Headers**: `Authorization: Bearer <admin_token>`

**Response** (200 OK):
```json
{
  "message": "User deleted successfully"
}
```

---

### 9.6 Admin Settings
**Endpoint**: `GET /admin/settings`

**Headers**: `Authorization: Bearer <admin_token>`

**Response** (200 OK):
```json
{
  "notifications": {
    "email": true,
    "sms": false,
    "push": true
  },
  "security": {
    "twoFactor": true,
    "sessionTimeout": 30,
    "ipWhitelist": false
  },
  "platform": {
    "maintenanceMode": false,
    "registrationEnabled": true,
    "apiEnabled": true
  },
  "integrations": {
    "stripe": true,
    "intercom": true,
    "analytics": true
  }
}
```

---

### 9.7 Update Admin Settings
**Endpoint**: `PUT /admin/settings`

**Headers**: `Authorization: Bearer <admin_token>`

**Request Body**: Partial settings object

**Response**: Updated settings object

---

### 9.8 Get All Managers
**Endpoint**: `GET /admin/managers`

**Headers**: `Authorization: Bearer <admin_token>`

**Response**: Array of manager objects with performance metrics

---

### 9.9 Create/Update Manager
**Endpoint**: `POST /admin/managers` or `PUT /admin/managers/:managerId`

**Headers**: `Authorization: Bearer <admin_token>`

---

## 10. Demo Booking

### 10.1 Get Available Demo Slots
**Endpoint**: `GET /booked-demo-slots`

**Response** (200 OK):
```json
{
  "bookedSlots": [
    "2024-01-15T10:00:00Z",
    "2024-01-15T14:00:00Z"
  ]
}
```

---

### 10.2 Book Demo
**Endpoint**: `POST /demo-booking`

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "preferredDateTime": "2024-01-20T10:00:00Z",
  "message": "Interested in learning about your investment strategies"
}
```

**Response** (201 Created):
```json
{
  "message": "Demo booked successfully",
  "bookingId": "uuid",
  "meetingLink": "https://zoom.us/j/...",
  "calendarInvite": "https://..."
}
```

**Requirements**:
- Check slot availability
- Send confirmation email
- Create calendar event
- Generate meeting link (Zoom/Google Meet)

---

## 11. Newsletter & Waitlist

### 11.1 Subscribe to Newsletter
**Endpoint**: `POST /waitlist`

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** (200 OK):
```json
{
  "message": "Successfully subscribed to newsletter"
}
```

**Requirements**:
- Validate email
- Check for duplicates
- Add to mailing list (Mailchimp/SendGrid)
- Send confirmation email

---

## 12. Additional Features

### 12.1 Get Dashboard Statistics
**Endpoint**: `GET /dashboard/stats`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "totalBalance": 50000.00,
  "totalInvested": 45000.00,
  "totalReturn": 5000.00,
  "activeInvestments": 5,
  "pendingTransactions": 2,
  "recentActivity": [ /* recent transactions */ ]
}
```

---

### 12.2 Get Risk Assessment
**Endpoint**: `GET /risk/assessment`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "riskLevel": "moderate",
  "riskScore": 65,
  "recommendations": [
    "Diversify your portfolio",
    "Consider reducing exposure to high-risk assets"
  ]
}
```

---

### 12.3 Upload Documents
**Endpoint**: `POST /documents/upload`

**Headers**: `Authorization: Bearer <token>`

**Request**: `multipart/form-data` with file

**Response** (200 OK):
```json
{
  "documentId": "uuid",
  "fileName": "document.pdf",
  "fileUrl": "https://cdn.evermount.co/documents/uuid/document.pdf",
  "uploadedAt": "2024-01-01T00:00:00Z"
}
```

---

## Security Requirements

1. **Authentication**:
   - JWT tokens with expiration
   - Refresh token mechanism
   - Token blacklisting on logout

2. **Authorization**:
   - Role-based access control (RBAC)
   - Admin-only endpoints protection
   - Resource ownership validation

3. **Validation**:
   - Input validation on all endpoints
   - SQL injection prevention
   - XSS protection
   - Rate limiting

4. **Data Protection**:
   - Encrypt sensitive data
   - Hash passwords (bcrypt)
   - Secure file uploads
   - HTTPS only

5. **Error Handling**:
   - Consistent error response format
   - Don't expose internal errors
   - Log errors for debugging

---

## Error Response Format

All errors should follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { /* optional additional details */ }
  }
}
```

**Common HTTP Status Codes**:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (e.g., duplicate email)
- `422` - Validation Error
- `500` - Internal Server Error

---

## Database Schema Recommendations

### Users Table
- id, email, password_hash, full_name, role, status, kyc_status, created_at, updated_at

### Wallets Table
- id, user_id, type, balance, currency, created_at

### Transactions Table
- id, user_id, type, amount, currency, status, description, created_at

### Investments Table
- id, user_id, investment_option_id, amount, status, created_at, closed_at

### KYC Submissions Table
- id, user_id, status, documents, submitted_at, verified_at

### Demo Bookings Table
- id, full_name, email, company, preferred_date_time, status, created_at

---

## Implementation Notes

1. Use environment variables for sensitive data
2. Implement proper logging (Winston, Pino)
3. Use database migrations (Knex, TypeORM)
4. Implement caching where appropriate (Redis)
5. Set up monitoring and alerts
6. Write unit and integration tests
7. Document API with OpenAPI/Swagger
8. Implement webhook support for payment providers
9. Set up background jobs for email sending, notifications
10. Implement real-time updates using WebSockets for transaction status

---

## Testing Checklist

- [ ] All authentication endpoints work correctly
- [ ] Password validation and hashing works
- [ ] JWT token generation and validation
- [ ] Email verification flow
- [ ] Password reset flow
- [ ] Social authentication integration
- [ ] Profile CRUD operations
- [ ] KYC document upload and processing
- [ ] Deposit/withdrawal flows
- [ ] Investment creation and management
- [ ] Portfolio calculations
- [ ] Transaction history
- [ ] Admin endpoints with proper authorization
- [ ] Error handling and validation
- [ ] Rate limiting
- [ ] File upload security
- [ ] API documentation

---

## Priority Implementation Order

1. **Phase 1 - Core Authentication** (Week 1)
   - User registration and login
   - JWT authentication
   - Password reset
   - Email verification

2. **Phase 2 - User Management** (Week 2)
   - Profile management
   - Settings
   - KYC submission

3. **Phase 3 - Financial Operations** (Week 3-4)
   - Wallets and balance
   - Deposits (all methods)
   - Withdrawals (all methods)
   - Transactions

4. **Phase 4 - Investments** (Week 5-6)
   - Investment options
   - Portfolio management
   - Performance tracking

5. **Phase 5 - Admin Features** (Week 7)
   - User management
   - KYC approval
   - Settings management

6. **Phase 6 - Additional Features** (Week 8)
   - Demo booking
   - Newsletter
   - Dashboard stats

---

This comprehensive prompt should guide the backend development team to implement all necessary API endpoints for the Evermount Capital platform.

