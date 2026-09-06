# Evermount backend sync prompt

Paste everything below the line into the backend repository chat.

---

You are working in the **Evermount backend** repository. Sync it with the **updated public frontend** shipped on `www.evermount.co` (Next.js app, repo `evermount-capital`, production Node 24).

Do **not** invent licenses, broker/dealer status, AUM, customers, latency, uptime, or live APIs that the frontend marks as coming soon. Do **not** break existing authenticated wallet / deposit / investment / KYC endpoints the dashboard still calls. Align **copy, emails, OpenAPI titles, admin labels, CORS, and lead capture** with the new company story. Implement only what the frontend already calls or what this prompt explicitly asks for.

## 1. Company story the API must match

Evermount is a **financial technology and market-infrastructure company**, globally oriented, **not** a public investment fund.

Public positioning:

- Product: data, quantitative research, intelligence, risk, execution, and connectivity **infrastructure**.
- Primary CTA: **Request Access** → frontend route `/book-demo` → backend `POST /demo-booking`.
- Commercial model: **quoted** Developer / Professional / Institutional / Enterprise. No published list prices. No fund management fees in public copy.
- Legal: technology / infrastructure provider. Availability depends on jurisdiction. Do **not** claim SEC, FCA, CMA, MiFID, broker, adviser, or custody status unless counsel has confirmed it in writing.

**Dual product (critical):** the marketing site is infrastructure. The logged-in app is still an **investor-style dashboard** (`/login`, `/register`, `/dashboard/*`) with wallets, deposits, withdrawals, investments, KYC, statements, admin. Keep those APIs working. Stop describing them in emails, OpenAPI, and admin as “Evermount Capital fund / invest now” unless product leadership decides that product remains a capital account. Prefer:

| Surface | Language to use |
| --- | --- |
| Public / unauthenticated | Request access, platform, infrastructure, APIs (gated) |
| Authenticated dashboard (until rebuilt) | Account, portfolio, wallet, verification — not “public fund” |
| Errors / emails | Evermount (drop “Evermount Capital” and “investor portal” unless that product is still intentional) |

## 2. Frontend facts (do not assume otherwise)

- Public origin: `https://www.evermount.co`
- API origin expected: `https://api.evermount.co` (`NEXT_PUBLIC_API_URL`)
- App origin for OAuth: `NEXT_PUBLIC_APP_URL` (local frontend is port **3001**)
- Auth: Axios client sends `Authorization: Bearer <access>`. Refresh: `POST /auth/refresh` with `{ "refreshToken" }`. Success body must include `token` and `refreshToken`. 401 on `/auth/refresh` or `/auth/login` clears client auth and sends the user to `/login`.
- Error shape the UI reads first: `response.data.error.message`, then `response.data.message`.
- Newsletter footer posts `{ "email" }` to **`POST /waitlist`** (not `/newsletter`).
- Request Access / Contact posts `{ fullName, email, company?, preferredDateTime, message? }` to **`POST /demo-booking`**. Calendar uses **`GET /booked-demo-slots`** expecting `{ bookedSlots: string[] }` ISO datetimes.
- Register still sends `{ email, password, fullName }`.
- Login still sends `{ email, password }` and expects `token` plus user object (and refresh token if you already issue one).
- GitHub OAuth: frontend Next route `POST /api/auth/github/callback` then backend `POST /auth/github` with `{ accessToken }`. Also support google / x / apple as already wired.
- robots.txt **disallows** `/login`, `/register`, `/dashboard`, `/api`. Do not rely on that as security.

## 3. Public routes vs private app

**Indexed marketing (no fund funnel):** `/` `/platform` `/infrastructure` `/markets` `/institutions` `/developers` `/research` `/technology` `/pricing` `/analytics` `/platform-tour` `/about` `/careers` `/partners` `/book-demo` plus legal pages (`/terms` `/privacy` `/cookie-policy` `/risk-disclosure` `/data-policy` `/api-terms` `/aml-policy` `/regulatory-compliance` `/conflict-of-interest` `/best-execution`).

**301s on the frontend (update any backend-generated links):**

- `/investor-tour` → `/platform-tour`
- `/portfolio-insights` → `/analytics`
- `/capital` → `/institutions`
- `/features` → `/platform`
- `/investment-agreement` → `/terms`

**Private (still live, still calling capital APIs):** `/login` `/register` `/forgot-password` `/reset-password` `/verify-email` `/dashboard` (trade, portfolio, wallets, transactions, statements, kyc, help, settings) plus admin (`/dashboard/admin/*`) and manager routes.

CORS: allow `https://www.evermount.co`, `https://evermount.co`, and local `http://localhost:3001`.

## 4. What to change in the backend now

### 4.1 Identity and transactional copy

Search backend for: `Evermount Capital`, `investor portal`, `fund`, `AUM`, `management fee`, `lock-in`, `invest now`, `Africa-focused`, `deposit capital`. Update:

- Transactional email subjects/bodies (verify, reset, KYC, deposit, withdrawal)
- OpenAPI / Swagger title and description
- Admin console labels
- PDF statements headers
- Support macros

Do **not** change wallet math, investment lock-in fields, or KYC state machines unless a field is unused. Copy only unless a payload is wrong.

### 4.2 Lead objects (Request Access)

Treat `/demo-booking` as **platform access / sales**, not a retail investment demo.

Persist: fullName, email, company, preferredDateTime, message, source=`www.evermount.co`, userAgent/ip if you already store them, status (new / scheduled / approved / rejected).

Optional (if cheap): add `intent` enum `access | sales | research | developer` default `access`. Frontend does not send it yet; do not require it.

Notify `info@evermount.co` (or existing ops inbox) with subject like `Access request — {company or email}`.

`GET /booked-demo-slots` must keep returning ISO strings the date picker can disable.

### 4.3 Waitlist / newsletter

`POST /waitlist` `{ email }` — keep 200 even if already subscribed (frontend shows a toast). Tag list as **technology / research updates**, not investment newsletter.

### 4.4 Developer access (prepare, do not fake production APIs)

Public `/developers` lists **planned** surfaces: Market Data, Historical, Analytics, Risk, Execution; REST / WebSockets / webhooks; Python/TS/C++/Rust SDKs **coming soon**; sandbox **coming soon**; status page **coming soon**.

Backend work:

- Do **not** publish unauthenticated “live” market/execution APIs.
- Add an internal `developer_access` (or reuse demo-booking + role) for approved orgs: API key issuance can stay stubbed with `status: pending`.
- If you already have a public OpenAPI, mark unimplemented routes `planned` or hide them from the public spec.
- Status endpoint: if you add `GET /status` or similar, it may be public and honest (no fake 99.99%).

### 4.5 Auth and dashboard contracts (preserve)

Keep working unless tests prove a mismatch:

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/auth/register` | `{ email, password, fullName }` |
| POST | `/auth/login` | return `token`, `refreshToken` if used, `user` |
| POST | `/auth/refresh` | `{ refreshToken }` → `{ token, refreshToken }` |
| POST | `/auth/logout` | |
| POST | `/auth/send-reset-password` | `{ email }` |
| POST | `/auth/reset-password` | `{ email, otp, newPassword }` |
| POST | `/auth/verify-email` | `{ token }` |
| POST | `/auth/google` `/auth/github` `/auth/x` `/auth/apple` | |
| GET | `/dashboard/stats` | |
| GET | `/wallets/balance` `/wallets/history` | |
| POST | `/wallets/transfer-to-investment` `/wallets/withdraw-profit` | |
| investments, deposits, withdrawals, kyc, documents, statements, risk/assessment, users, admin/*, ops, compliance, portfolio-manager | as already implemented | frontend `src/lib/api/*.ts` is source of truth |

If login metadata still says “investor portal”, that is a **frontend** bug. Backend emails should already use the infrastructure wording so the two surfaces do not fight.

### 4.6 Roles

Existing roles likely include user / admin / manager. Do not invent “institution” roles in JWT until the frontend sends them. Optional later: `access_tier`: developer | professional | institutional | enterprise — unused by UI today.

## 5. What not to build from marketing copy

The homepage describes a six-layer stack and a NOW/NEXT/THEN roadmap. That is **marketing**, not an API spec.

Do **not** implement or document as live:

- Named AI agents as public products
- C++/Rust/Kubernetes as production facts
- Smart routing / venue connectivity as generally available
- GEX / options / gold decision engine as a public Evermount API (that work is a separate internal engine; do not merge it into public OpenAPI)

Do **not** return fabricated performance, Top Movers as “live Evermount prices”, or sample market data from the backend as if it were a licensed feed.

## 6. Security and compliance

- JWT on all dashboard routes; public booking/waitlist rate-limited.
- KYC/AML flows stay for money movement. Infrastructure-only leads should **not** be forced through full KYC until they fund or get production keys.
- Legal pages live on the frontend; backend PDFs/emails must not contradict “we are not soliciting deposits as a fund on the public site.”
- No new PII fields on waitlist beyond email.

## 7. Acceptance checks

1. `POST /demo-booking` from a browser on `www.evermount.co` / localhost:3001 succeeds; email uses “access / platform”, not “start investing.”
2. `GET /booked-demo-slots` shape unchanged.
3. `POST /waitlist` accepts `{ email }`.
4. Login, refresh, register, wallet, KYC, admin still pass existing tests.
5. OpenAPI title is Evermount infrastructure/API, not Evermount Capital fund.
6. CORS includes www + apex + local 3001.
7. No new public unauthenticated trading or market-data dump.

## 8. Suggested implementation order

1. Copy/email/OpenAPI/CORS sweep.
2. Confirm demo-booking + waitlist payloads.
3. Rate-limit public POSTs.
4. Optional: `developer_access` stub + honest `/status`.
5. Leave capital APIs stable; ticket a later “account product vs infrastructure product” split.

If a frontend file and this prompt disagree on a path or JSON field, **trust `evermount-capital/src/lib/api/*.ts`**.
