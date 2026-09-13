#!/usr/bin/env python3
"""Generate Evermount internal PDFs. Not a runtime dependency of the app."""

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

GREEN = HexColor("#00a76f")
INK = HexColor("#111827")
MUTED = HexColor("#4b5563")
RULE = HexColor("#e5e7eb")
BG = HexColor("#f3f4f6")

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

