from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer
from pdf_kit import bullets, footer, header_block, styles, table

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


