#!/usr/bin/env python3
"""Generate Evermount internal PDFs. Not a runtime dependency of the app."""

from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

GREEN = HexColor("#00a76f")
INK = HexColor("#111827")
MUTED = HexColor("#4b5563")
RULE = HexColor("#e5e7eb")
BG = HexColor("#f3f4f6")
OUT = Path(__file__).resolve().parent

styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        "CoverKicker",
        fontName="Helvetica",
        fontSize=9,
        textColor=GREEN,
        spaceAfter=8,
        tracking=1.2,
    )
)
styles.add(
    ParagraphStyle(
        "CoverTitle",
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=26,
        textColor=INK,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        "CoverSub",
        fontName="Helvetica",
        fontSize=11,
        leading=16,
        textColor=MUTED,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        "H",
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=17,
        textColor=INK,
        spaceBefore=14,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        "H2",
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=15,
        textColor=INK,
        spaceBefore=10,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        "Body",
        fontName="Helvetica",
        fontSize=9.5,
        leading=13.5,
        textColor=INK,
        alignment=TA_JUSTIFY,
        spaceAfter=7,
    )
)
styles.add(
    ParagraphStyle(
        "BulletBody",
        fontName="Helvetica",
        fontSize=9.5,
        leading=13,
        textColor=INK,
        alignment=TA_LEFT,
    )
)
styles.add(
    ParagraphStyle(
        "Caption",
        fontName="Helvetica",
        fontSize=8,
        leading=11,
        textColor=MUTED,
        spaceBefore=2,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        "Cell",
        fontName="Helvetica",
        fontSize=8,
        leading=11,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        "CellHead",
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=11,
        textColor=white,
    )
)
styles.add(
    ParagraphStyle(
        "Warn",
        fontName="Helvetica",
        fontSize=9,
        leading=13,
        textColor=INK,
        backColor=BG,
        borderPadding=8,
        spaceAfter=10,
    )
)


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.line(18 * mm, 14 * mm, A4[0] - 18 * mm, 14 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(
        18 * mm,
        9 * mm,
        "Evermount — internal. Not for the public website.",
    )
    canvas.drawRightString(A4[0] - 18 * mm, 9 * mm, f"{doc.page}")
    canvas.restoreState()


def bullets(items):
    return ListFlowable(
        [
            ListItem(Paragraph(i, styles["BulletBody"]), leftIndent=8, bulletColor=GREEN)
            for i in items
        ],
        bulletType="bullet",
        start="•",
        leftIndent=12,
        spaceAfter=8,
    )


def table(headers, rows):
    head = [Paragraph(h, styles["CellHead"]) for h in headers]
    body = [[Paragraph(c, styles["Cell"]) for c in row] for row in rows]
    t = Table([head] + body, repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), GREEN),
                ("TEXTCOLOR", (0, 0), (-1, 0), white),
                ("BACKGROUND", (0, 1), (-1, -1), white),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, BG]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("GRID", (0, 0), (-1, -1), 0.3, RULE),
            ]
        )
    )
    return t


def header_block(kicker, title, subtitle):
    return [
        Paragraph(kicker.upper(), styles["CoverKicker"]),
        Paragraph(title, styles["CoverTitle"]),
        Paragraph(subtitle, styles["CoverSub"]),
        Spacer(1, 8),
    ]


def build_business_plan(path: Path):
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=20 * mm,
        title="Evermount Business Plan (internal)",
        author="Evermount",
    )
    s = []
    s += header_block(
        "Confidential · September 2026",
        "Evermount business plan",
        "Financial technology and market infrastructure. Working draft aligned "
        "with the public site at www.evermount.co. No AUM, revenue, customer, "
        "or license figures are invented here.",
    )
    s.append(
        Paragraph(
            "<b>Positioning decision.</b> The public company is a technology "
            "and infrastructure vendor, not a marketed investment fund. The "
            "logged-in product still contains wallets, deposits, and investment "
            "flows. This plan treats that split as a product-architecture issue "
            "to resolve, not as something to advertise.",
            styles["Warn"],
        )
    )

    s.append(Paragraph("1. Company", styles["H"]))
    s.append(
        Paragraph(
            "Evermount builds programmable infrastructure for market data, "
            "quantitative research, intelligence, risk, and execution. Founded "
            "in 2023. Public brand is globally oriented. Headquarters contact "
            "on the site includes info@evermount.co. The company must not claim "
            "broker, adviser, exchange, or custody status on the public site "
            "or in sales materials unless counsel confirms it.",
            styles["Body"],
        )
    )

    s.append(Paragraph("2. Problem", styles["H"]))
    s.append(
        Paragraph(
            "Institutions, trading firms, and fintechs still assemble market "
            "data, research tooling, risk controls, and execution connectivity "
            "from fragmented vendors. Building that stack in-house is slow and "
            "expensive. The public site sells a unified infrastructure story. "
            "The honest current state is earlier: research and engineering "
            "capability, a Next.js commercial site, an existing account/wallet "
            "application, and a separate internal gold options / GEX research "
            "engine that is not a public product.",
            styles["Body"],
        )
    )

    s.append(Paragraph("3. Solution (two tracks)", styles["H"]))
    s.append(
        Paragraph(
            "<b>Track A — Infrastructure (public).</b> Quoted access to "
            "platform capabilities as they become real: data, research "
            "tooling, analytics, risk, and later execution connectivity. "
            "Primary CTA is Request Access. Pricing tiers are Developer, "
            "Professional, Institutional, and Enterprise — terms are quoted, "
            "not listed as fund fees.",
            styles["Body"],
        )
    )
    s.append(
        Paragraph(
            "<b>Track B — Account application (private).</b> /login and "
            "/dashboard still implement investor-style wallets, deposits, "
            "withdrawals, investment options, KYC, statements, and admin. "
            "Keep it running for existing flows. Do not lead the public site "
            "with it. Decide later whether Track B becomes a gated account "
            "product, a sandbox, or is retired.",
            styles["Body"],
        )
    )

    s.append(Paragraph("4. Who we sell to", styles["H"]))
    s.append(
        Paragraph(
            "Do not list every institution type equally. Near-term ICPs:",
            styles["Body"],
        )
    )
    s.append(
        bullets(
            [
                "Trading firms and fintechs that need research, data, and risk APIs.",
                "Developers integrating market data and analytics (gated keys).",
                "Later: brokers and asset managers once connectivity and controls are real.",
            ]
        )
    )
    s.append(
        Paragraph(
            "Exchanges, banks, and market makers remain a longer-term audience. "
            "Naming them all on the homepage maps the TAM for competitors "
            "without converting buyers.",
            styles["Body"],
        )
    )

    s.append(Paragraph("5. Offer and pricing", styles["H"]))
    s.append(
        table(
            ["Tier", "Intent", "Public claim"],
            [
                [
                    "Developer",
                    "Sandbox, limited API, historical data, docs — when live",
                    "Potential capabilities; quoted",
                ],
                [
                    "Professional",
                    "Real-time data, analytics, risk, execution where enabled",
                    "Quoted; not generally available",
                ],
                [
                    "Institutional",
                    "Dedicated connectivity, risk, support",
                    "Contracted",
                ],
                [
                    "Enterprise",
                    "Private deployment, custom integration, SLA",
                    "Contracted",
                ],
            ],
        )
    )
    s.append(
        Paragraph(
            "Source: live /pricing page. Do not publish invented list prices.",
            styles["Caption"],
        )
    )

    s.append(Paragraph("6. Go-to-market", styles["H"]))
    s.append(
        bullets(
            [
                "Inbound: www.evermount.co → Request Access → POST /demo-booking.",
                "Outbound: LinkedIn and direct sales to 2–3 ICPs, not every footer persona.",
                "Developers: gated docs and keys after approval; SDKs labeled coming soon.",
                "Research: publish notes only when they exist; empty /research is acceptable.",
            ]
        )
    )

    s.append(Paragraph("7. What stays internal", styles["H"]))
    s.append(
        Paragraph(
            "A public review of the live site found oversharing of sequencing "
            "and architecture, not of source code. Competitors can copy a "
            "roadmap more easily than a ticker widget. Keep the following off "
            "the website and out of public API docs:",
            styles["Body"],
        )
    )
    s.append(
        bullets(
            [
                "NOW / NEXT / THEN / VISION (quant → systematic trading → market-making → global connectivity).",
                "Repeated six-layer stack as a blueprint (one conceptual diagram is enough).",
                "Full planned API catalog and language/Kubernetes roadmap presented as facts.",
                "Named internal AI agent topology and proprietary strategy language in bios.",
                "GEX / COMEX gold options engine, vendors, and decision API.",
            ]
        )
    )

    s.append(Paragraph("8. Organization", styles["H"]))
    s.append(
        Paragraph(
            "Public leadership names: Daniel Mawioo (CEO, co-founder), Evans "
            "Kipngetich (CDO, co-founder), Tony K. (Head of Quantitative "
            "Research), Bonface Kuria (Head of Security & Infrastructure), "
            "John Esther (Senior AI Engineer). Bios on the site include "
            "hedge-fund pedigree, PhD, and proprietary-strategy claims. "
            "Those must be fact-checked before they are used in investor or "
            "enterprise diligence. Do not use “world-class” as a substitute "
            "for proof.",
            styles["Body"],
        )
    )

    s.append(Paragraph("9. Technology thesis (internal)", styles["H"]))
    s.append(
        Paragraph(
            "Commercial frontend: Next.js 15, Node 24, Vercel, www.evermount.co. "
            "Account APIs: existing backend at api.evermount.co (JWT, wallets, "
            "KYC, admin). Internal research: gex-engine (Python/FastAPI, paper "
            "mode, XAUUSD / COMEX mapping) — not a public Evermount API. "
            "Do not merge GEX into the public OpenAPI.",
            styles["Body"],
        )
    )

    s.append(Paragraph("10. Risks", styles["H"]))
    s.append(
        table(
            ["Risk", "Why it matters", "Mitigation"],
            [
                [
                    "Two products, one brand",
                    "Buyers and regulators see both a tech vendor and a capital account",
                    "Separate copy, emails, and eventually separate apps or roles",
                ],
                [
                    "Capability inflation",
                    "Site lists APIs, venues, and agents that are not live",
                    "Ship only gated access; mark coming soon; no fake metrics",
                ],
                [
                    "Regulatory",
                    "Wallet/deposit UI can look like a fund solicitation",
                    "Counsel on legal pages; no public deposit CTA",
                ],
                [
                    "Competitive disclosure",
                    "Roadmap and stack teach rivals the sequence",
                    "Public site = category + proof; playbook stays internal",
                ],
                [
                    "Bio / claim risk",
                    "Unverified pedigree fails diligence",
                    "Short, accurate bios only",
                ],
            ],
        )
    )

    s.append(Paragraph("11. 90-day operating plan", styles["H"]))
    s.append(
        bullets(
            [
                "Days 1–30: Sync backend copy, CORS, demo-booking, waitlist. Tighten homepage (cut roadmap). Fact-check bios. Align /login metadata.",
                "Days 31–60: Define whether Track B stays. If yes, noindex and rebrand the portal as an account app. If no, freeze new capital features.",
                "Days 61–90: One real gated capability (e.g. access request → documented historical or research API) with honest status. Do not launch a fake SDK.",
            ]
        )
    )

    s.append(Paragraph("12. What this plan does not claim", styles["H"]))
    s.append(
        Paragraph(
            "No revenue, ARR, AUM, customer logos, latency, uptime, licensed "
            "market-data rights, or regulatory authorizations are stated. "
            "Pricing is a commercial process, not a published schedule. "
            "This document is for internal and counsel use. It must not be "
            "uploaded as a public download on www.evermount.co.",
            styles["Body"],
        )
    )
    doc.build(s, onFirstPage=footer, onLaterPages=footer)


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


if __name__ == "__main__":
    build_business_plan(OUT / "Evermount-Business-Plan.pdf")
    build_project_docs(OUT / "Evermount-Project-Documentation.pdf")
    print("wrote", OUT / "Evermount-Business-Plan.pdf")
    print("wrote", OUT / "Evermount-Project-Documentation.pdf")
