from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer
from pdf_kit import bullets, footer, header_block, styles, table

def build_project_docs(path: Path):
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=20 * mm,
        title="Evermount project documentation",
        author="Evermount",
    )
    s = []
    s += header_block(
        "Internal · September 2026",
        "Evermount project documentation",
        "Systems, information architecture, API contracts the frontend actually "
        "calls, and the dual-product split. Companion to docs/BACKEND_FRONTEND_SYNC_PROMPT.md.",
    )

    s.append(Paragraph("1. Repositories and runtime", styles["H"]))
    s.append(
        table(
            ["System", "What it is", "Notes"],
            [
                [
                    "evermount-capital",
                    "Next.js 15 marketing site + account dashboard",
                    "Node 24, Yarn 1, Vercel, port 3001 locally",
                ],
                [
                    "Backend (separate repo)",
                    "REST API at api.evermount.co",
                    "JWT, wallets, KYC, admin — keep stable",
                ],
                [
                    "gex-engine",
                    "Internal Python FastAPI research engine",
                    "Uncommitted in frontend repo; paper mode; not public",
                ],
            ],
        )
    )
    s.append(Spacer(1, 8))

    s.append(Paragraph("2. Public information architecture", styles["H"]))
    s.append(
        Paragraph(
            "Nav: Platform, Markets, Institutions, Developers, Research, Company. "
            "Primary CTA: Request Access → /book-demo. Secondary: Explore Platform.",
            styles["Body"],
        )
    )
    s.append(
        table(
            ["Path", "Role"],
            [
                ["/", "Homepage — infrastructure positioning"],
                ["/platform /infrastructure /technology", "Product and stack (conceptual)"],
                ["/markets /institutions /developers /research", "Audience and access"],
                ["/pricing", "Quoted tiers; no invented prices"],
                ["/book-demo /partners /about /careers", "Sales and company"],
                [
                    "/terms /privacy /data-policy /api-terms /risk-disclosure …",
                    "Legal — counsel should still review",
                ],
            ],
        )
    )
    s.append(Paragraph("Frontend 301 redirects", styles["H2"]))
    s.append(
        bullets(
            [
                "/investor-tour → /platform-tour",
                "/portfolio-insights → /analytics",
                "/capital → /institutions",
                "/features → /platform",
                "/investment-agreement → /terms",
            ]
        )
    )

    s.append(Paragraph("3. Private application (still live)", styles["H"]))
    s.append(
        Paragraph(
            "robots.txt disallows /login, /register, password flows, /dashboard, "
            "and /api. That is not access control. The dashboard sidebar still "
            "exposes Overview, Trade, Portfolio, Wallet, Transactions, Documents, "
            "Verification, Help, Settings, plus admin Users, Managers, KYC, "
            "Withdrawals, Trading Ops, Compliance.",
            styles["Body"],
        )
    )
    s.append(
        Paragraph(
            "Login page copy and metadata still say “Evermount Capital investor "
            "portal.” That contradicts the public site and should be fixed on "
            "the frontend; backend emails should already use infrastructure "
            "wording so crawlers and inboxes do not tell two stories.",
            styles["Body"],
        )
    )

    s.append(Paragraph("4. Frontend API client", styles["H"]))
    s.append(
        Paragraph(
            "Single Axios instance: src/lib/api/client.ts. Base URL: "
            "NEXT_PUBLIC_API_URL or https://api.evermount.co. Request interceptor "
            "attaches Bearer access token. On 401, POST /auth/refresh with "
            "{ refreshToken }; retry once; otherwise clear auth and redirect to "
            "/login. Error toast text: response.data.error.message then "
            "response.data.message (src/lib/api-error.ts).",
            styles["Body"],
        )
    )
    s.append(
        Paragraph(
            "Domain modules composed in src/lib/api-client.ts: auth, users, kyc, "
            "wallets, deposits, withdrawals, investments, portfolio, transactions, "
            "dashboard, risk, documents, demo, newsletter, ops, portfolioManager, "
            "security, statements, compliance, admin. Mock mode: "
            "NEXT_PUBLIC_API_MOCKING=enabled (MSW).",
            styles["Body"],
        )
    )

    s.append(Paragraph("5. Contracts that must not drift", styles["H"]))
    s.append(
        table(
            ["Call", "Path", "Body / response"],
            [
                [
                    "Register",
                    "POST /auth/register",
                    "{ email, password, fullName }",
                ],
                [
                    "Login",
                    "POST /auth/login",
                    "{ email, password } → token, user, refreshToken",
                ],
                [
                    "Refresh",
                    "POST /auth/refresh",
                    "{ refreshToken } → { token, refreshToken }",
                ],
                [
                    "Request Access",
                    "POST /demo-booking",
                    "{ fullName, email, company?, preferredDateTime, message? }",
                ],
                [
                    "Calendar",
                    "GET /booked-demo-slots",
                    "{ bookedSlots: ISO string[] }",
                ],
                [
                    "Newsletter",
                    "POST /waitlist",
                    "{ email }",
                ],
                [
                    "Dashboard",
                    "GET /dashboard/stats",
                    "Authenticated",
                ],
                [
                    "Wallet",
                    "GET /wallets/balance, /wallets/history",
                    "Authenticated",
                ],
            ],
        )
    )
    s.append(
        Paragraph(
            "Also live: investments (options, preferences, trade preview/execute, "
            "create, close), deposits, withdrawals, KYC, statements download, "
            "risk/assessment, GitHub/Google/X/Apple auth, admin users/KYC/settings. "
            "Source of truth if this PDF and the server disagree: "
            "src/lib/api/*.ts.",
            styles["Caption"],
        )
    )

    s.append(Paragraph("6. Next.js BFF routes (not the main API)", styles["H"]))
    s.append(
        bullets(
            [
                "POST /api/auth/github/callback — OAuth code exchange, then backend /auth/github",
                "POST /api/chat — support chat (OpenAI keys server-side only)",
                "Stripe create-intent via /api/stripe/create-intent when used",
                "GET /api/health — frontend health",
            ]
        )
    )

    s.append(Paragraph("7. Environment", styles["H"]))
    s.append(
        Paragraph(
            "See .env.example: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_APP_URL, Stripe "
            "publishable key, GitHub OAuth, OpenAI for chat, optional Sentry and "
            "Intercom (Intercom off by default). Never put Stripe secret keys in "
            "the frontend repo.",
            styles["Body"],
        )
    )

    s.append(Paragraph("8. Security headers and SEO", styles["H"]))
    s.append(
        Paragraph(
            "next.config.ts sets X-Frame-Options DENY, nosniff, Referrer-Policy, "
            "Permissions-Policy, HSTS. Sitemap lists marketing and legal routes "
            "only. Do not add /login or /dashboard to the sitemap.",
            styles["Body"],
        )
    )

    s.append(Paragraph("9. Internal research engine (gex-engine)", styles["H"]))
    s.append(
        Paragraph(
            "Separate Python service for XAUUSD / COMEX gold options analytics "
            "and a paper decision snapshot. Default PAPER. It does not place "
            "broker orders. Typical local routes include /api/decision, "
            "/api/market, /api/status. Do not expose this as www.evermount.co "
            "developer documentation. Do not commit secrets from gex-engine/.env.",
            styles["Body"],
        )
    )

    s.append(Paragraph("10. Known inconsistencies to fix", styles["H"]))
    s.append(
        bullets(
            [
                "Public site = infrastructure; login metadata = investor portal.",
                "Homepage repeats the same six capabilities and publishes a company roadmap.",
                "Hero Top Movers (crypto/equities sample) reads as retail, not infra.",
                "Empty careers and coming-soon research still sit in primary nav.",
                "Kenya phone and TikTok/Discord vs global institutional claim.",
            ]
        )
    )

    s.append(Paragraph("11. Backend sync", styles["H"]))
    s.append(
        Paragraph(
            "Paste docs/BACKEND_FRONTEND_SYNC_PROMPT.md into the backend repo "
            "agent. Priority: copy/email/OpenAPI/CORS; confirm demo-booking and "
            "waitlist; do not break capital APIs; do not publish fake market or "
            "execution APIs because the marketing site listed them.",
            styles["Body"],
        )
    )

    s.append(Paragraph("12. Document control", styles["H"]))
    s.append(
        Paragraph(
            "These PDFs are internal. They describe intent and current code, "
            "not audited financials. Update when the Track B account product is "
            "split or retired, and when the first real gated API ships.",
            styles["Body"],
        )
    )
    doc.build(s, onFirstPage=footer, onLaterPages=footer)

