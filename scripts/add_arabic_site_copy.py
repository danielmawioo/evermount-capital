#!/usr/bin/env python3
"""Append Arabic (ar-AE) translations for existing site-copy English strings."""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

# Reuse helpers from generate_site_copy
sys.path.insert(0, str(Path(__file__).resolve().parent))
from generate_site_copy import (  # noqa: E402
    load_cache,
    parse_existing_block,
    save_cache,
    translate_all,
    ts_escape,
)

ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    os.environ.pop("HTTP_PROXY", None)
    os.environ.pop("HTTPS_PROXY", None)
    os.environ.pop("http_proxy", None)
    os.environ.pop("https_proxy", None)
    os.environ.pop("ALL_PROXY", None)
    os.environ.pop("all_proxy", None)

    existing = {
        lang: parse_existing_block(lang)
        for lang in ("en", "fr", "es", "de", "nl")
    }
    keys = list(existing["en"].keys())
    en_values = [existing["en"][k] for k in keys]
    print(f"translating {len(en_values)} strings to ar", flush=True)
    cache = load_cache()
    ar_values = translate_all(en_values, "ar", cache)
    save_cache(cache)
    site_ar = {k: ar_values[i] for i, k in enumerate(keys)}

    text = (ROOT / "src/i18n/site-copy.ts").read_text()
    if "export const siteAr" in text:
        text = re.sub(
            r"\nexport const siteAr: Messages = \{.*?\n\};\n?\Z",
            "\n",
            text,
            count=1,
            flags=re.S,
        )

    lines = ["export const siteAr: Messages = {"]
    for key in keys:
        lines.append(f'  "{key}": "{ts_escape(site_ar[key])}",')
    lines.append("};")
    lines.append("")
    (ROOT / "src/i18n/site-copy.ts").write_text(text.rstrip() + "\n\n" + "\n".join(lines))
    print("wrote siteAr", flush=True)


if __name__ == "__main__":
    main()
