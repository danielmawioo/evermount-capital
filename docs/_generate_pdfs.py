#!/usr/bin/env python3
"""Generate Evermount internal PDFs. Not a runtime dependency of the app."""

from pathlib import Path

from pdf_business_plan import build_business_plan
from pdf_project_docs import build_project_docs

OUT = Path(__file__).resolve().parent

if __name__ == "__main__":
    build_business_plan(OUT / "Evermount-Business-Plan.pdf")
    build_project_docs(OUT / "Evermount-Project-Documentation.pdf")
    print("wrote", OUT / "Evermount-Business-Plan.pdf")
    print("wrote", OUT / "Evermount-Project-Documentation.pdf")
