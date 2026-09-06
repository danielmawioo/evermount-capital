#!/usr/bin/env python3
"""Extract UI copy and append missing translations to src/i18n/site-copy.ts."""

from __future__ import annotations

import json
import os
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from threading import Lock

from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"

jsx_text = re.compile(r"(?<![=!])>\s*([^<>{}]+?)\s*<", re.S)
prop = re.compile(
    r'(?:title|description|body|eyebrow|primaryLabel|secondaryLabel|badge|label|'
    r'question|placeholder|aria-label|alt)\s*[:=]\s*"((?:\\.|[^"\\])*)"'
)
array_item = re.compile(r'^\s+"([^"]{3,160})",?\s*$', re.M)
quoted_ui = re.compile(
    r'(?:return|toast\.(?:error|success)|label:)\s+"((?:\\.|[^"\\]){3,160})"'
)

SKIP_EXACT = {
    "div",
    "span",
    "true",
    "false",
    "OR",
    "C++",
    "NLP",
    "Python",
    "Rust",
    "GitHub",
    "Google",
    "Apple",
    "Discord",
    "LinkedIn",
    "TikTok",
    "REST",
    "WebSockets",
    "Webhooks",
    "Daniel Mawioo",
    "Jane Doe",
    "John",
    "Doe",
    "Evermount",
    "••••••••",
    "example@gmail.com",
    "you@example.com",
    "info@evermount.co",
    "cookies@evermount.com",
    "+254 758 578 816",
    "Mem No. 30280376",
}

PUBLIC_GLOBS = [
    "src/app/page.tsx",
    "src/app/not-found.tsx",
    "src/app/components/home-sections/*.tsx",
    "src/app/components/extended-home-sections/*.tsx",
    "src/app/about/**/*.tsx",
    "src/app/platform/page.tsx",
    "src/app/markets/page.tsx",
    "src/app/institutions/page.tsx",
    "src/app/developers/page.tsx",
    "src/app/research/page.tsx",
    "src/app/pricing/page.tsx",
    "src/app/partners/page.tsx",
    "src/app/technology/page.tsx",
    "src/app/infrastructure/page.tsx",
    "src/app/platform-tour/page.tsx",
    "src/app/analytics/page.tsx",
    "src/app/careers/**/*.tsx",
    "src/app/privacy/page.tsx",
    "src/app/cookie-policy/page.tsx",
    "src/app/login/page.tsx",
    "src/app/register/page.tsx",
    "src/app/forgot-password/page.tsx",
    "src/app/reset-password/page.tsx",
    "src/app/book-demo/page.tsx",
    "src/app/verify-email/page.tsx",
    "src/app/components/AuthLeftPanel.tsx",
    "src/app/components/TrustLogos.tsx",
    "src/app/components/LiveMarketTicker.tsx",
    "src/app/components/ChatWidget.tsx",
    "src/app/components/chat-widget/*.tsx",
    "src/app/components/Navbar.tsx",
    "src/app/components/Footer.tsx",
    "src/app/components/marketing/*.tsx",
    "src/app/*/LegalView.tsx",
    "src/app/components/Topbar.tsx",
    "src/app/components/CookieConsent.tsx",
    "src/app/components/Sidebar.tsx",
    "src/app/dashboard/**/*.tsx",
]


def unescape(s: str) -> str:
    return (
        s.replace('\\"', '"')
        .replace("\\n", " ")
        .replace("&apos;", "'")
        .replace("&quot;", '"')
        .replace("&amp;", "&")
    )


def normalize(s: str) -> str:
    return re.sub(r"\s+", " ", unescape(s)).strip()


def catalog_values() -> set[str]:
    vals: set[str] = set()
    for name in ["src/i18n/messages.ts", "src/i18n/site-copy.ts"]:
        text = (ROOT / name).read_text()
        for m in re.finditer(r':\s*"((?:\\.|[^"\\])*)"', text):
            vals.add(normalize(m.group(1)))
    return vals


def looks_copy(s: str) -> bool:
    if not (2 <= len(s) <= 900):
        return False
    if s in SKIP_EXACT:
        return False
    if s.startswith("bg-") or s.startswith("text-") or s.startswith("http"):
        return False
    if s.startswith(".") or s.startswith("(") or s.startswith("="):
        return False
    if "@" in s and re.search(r"\S+@\S+\.\S+", s) and " " not in s:
        return False
    if re.fullmatch(r"[\d\s$.,%:+-]+", s):
        return False
    if re.search(r"\b(useState|useEffect|const |return )\b", s):
        return False
    return True


def collect_files() -> list[Path]:
    files: list[Path] = []
    for g in PUBLIC_GLOBS:
        files.extend(ROOT.glob(g))
    out = []
    for p in files:
        if p.name.endswith(".test.tsx"):
            continue
        out.append(p)
    return sorted(set(out))


def extract() -> list[str]:
    found: set[str] = set()
    for p in collect_files():
        text = p.read_text(encoding="utf-8")
        for m in jsx_text.finditer(text):
            s = normalize(m.group(1))
            if looks_copy(s):
                found.add(s)
        for m in prop.finditer(text):
            s = normalize(m.group(1))
            if looks_copy(s):
                found.add(s)
        for m in array_item.finditer(text):
            s = normalize(m.group(1))
            if looks_copy(s) and (s[0].isupper() or " " in s):
                found.add(s)
        for m in quoted_ui.finditer(text):
            s = normalize(m.group(1))
            if looks_copy(s):
                found.add(s)
    catalog = catalog_values()
    missing = [s for s in found if s not in catalog]
    missing.sort(key=lambda x: (-len(x), x.lower()))
    return missing


def ts_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


CACHE_PATH = ROOT / "scripts/.i18n-cache.json"
CACHE_LOCK = Lock()


def load_cache() -> dict:
    if CACHE_PATH.exists():
        return json.loads(CACHE_PATH.read_text())
    return {}


def save_cache(cache: dict) -> None:
    with CACHE_LOCK:
        CACHE_PATH.write_text(json.dumps(cache, ensure_ascii=False))


def translate_one(text: str, target: str, cache: dict) -> str:
    with CACHE_LOCK:
        bucket = cache.setdefault(target, {})
        hit = bucket.get(text)
    if hit is not None:
        return hit
    translator = GoogleTranslator(source="en", target=target)
    last_err = None
    for attempt in range(3):
        try:
            with ThreadPoolExecutor(max_workers=1) as inner:
                translated = inner.submit(translator.translate, text).result(
                    timeout=12
                )
            if not translated:
                translated = text
            with CACHE_LOCK:
                bucket = cache.setdefault(target, {})
                bucket[text] = translated
            return translated
        except Exception as exc:  # noqa: BLE001
            last_err = exc
            time.sleep(0.4 * (attempt + 1))
    print(f"failed {target}: {text[:60]!r} ({last_err})", flush=True)
    with CACHE_LOCK:
        cache.setdefault(target, {})[text] = text
    return text


def translate_all(texts: list[str], target: str, cache: dict) -> list[str]:
    results: dict[int, str] = {}
    pending = list(enumerate(texts))
    with ThreadPoolExecutor(max_workers=12) as pool:
        future_map = {
            pool.submit(translate_one, text, target, cache): i
            for i, text in pending
        }
        done = 0
        for future in as_completed(future_map):
            i = future_map[future]
            results[i] = future.result()
            done += 1
            if done % 25 == 0 or done == len(texts):
                save_cache(cache)
                print(f"  {target} {done}/{len(texts)}", flush=True)
    save_cache(cache)
    return [results[i] for i in range(len(texts))]


def existing_max_index() -> int:
    text = (ROOT / "src/i18n/site-copy.ts").read_text()
    nums = [int(n) for n in re.findall(r'"site\.(\d+)"', text)]
    return max(nums) if nums else -1


def parse_existing_block(lang: str) -> dict[str, str]:
    text = (ROOT / "src/i18n/site-copy.ts").read_text()
    names = {
        "en": "siteEn",
        "fr": "siteFr",
        "es": "siteEs",
        "de": "siteDe",
        "nl": "siteNl",
        "ar": "siteAr",
    }
    name = names[lang]
    m = re.search(rf"export const {name}: Messages = \{{(.*?)\n\}};", text, re.S)
    if not m:
        return {}
    body = m.group(1)
    pairs = {}
    for km in re.finditer(r'"site\.(\d+)":\s*"((?:\\.|[^"\\])*)"', body):
        pairs[f"site.{km.group(1)}"] = unescape(km.group(2))
    return pairs


def write_site_copy(
    existing: dict[str, dict[str, str]], new_en: list[str], translations: dict[str, list[str]]
) -> None:
    start = existing_max_index() + 1
    keys = list(existing["en"].keys())
    en_map = dict(existing["en"])
    fr_map = dict(existing["fr"])
    es_map = dict(existing["es"])
    de_map = dict(existing["de"])
    nl_map = dict(existing["nl"])

    for i, en in enumerate(new_en):
        key = f"site.{start + i}"
        keys.append(key)
        en_map[key] = en
        fr_map[key] = translations["fr"][i]
        es_map[key] = translations["es"][i]
        de_map[key] = translations["de"][i]
        nl_map[key] = translations["nl"][i]

    def block(name: str, mapping: dict[str, str]) -> str:
        lines = [f"export const {name}: Messages = {{"]
        for key in keys:
            lines.append(f'  "{key}": "{ts_escape(mapping[key])}",')
        lines.append("};")
        return "\n".join(lines)

    contents = (
        'import type { Messages } from "./types";\n\n'
        + block("siteEn", en_map)
        + "\n\n"
        + block("siteFr", fr_map)
        + "\n\n"
        + block("siteEs", es_map)
        + "\n\n"
        + block("siteDe", de_map)
        + "\n\n"
        + block("siteNl", nl_map)
        + "\n"
    )
    (ROOT / "src/i18n/site-copy.ts").write_text(contents)


def main() -> None:
    os.environ.pop("HTTP_PROXY", None)
    os.environ.pop("HTTPS_PROXY", None)
    os.environ.pop("http_proxy", None)
    os.environ.pop("https_proxy", None)
    os.environ.pop("ALL_PROXY", None)
    os.environ.pop("all_proxy", None)

    missing = extract()
    cache = ROOT / "scripts/.site-copy-missing.json"
    cache.write_text(json.dumps(missing, indent=2, ensure_ascii=False))
    print(f"missing {len(missing)}")
    if not missing:
        return

    existing = {lang: parse_existing_block(lang) for lang in ("en", "fr", "es", "de", "nl")}
    cache = load_cache()
    translations = {}
    for lang in ("fr", "es", "de", "nl"):
        print("translating", lang, flush=True)
        translations[lang] = translate_all(missing, lang, cache)
    save_cache(cache)

    write_site_copy(existing, missing, translations)
    print("wrote src/i18n/site-copy.ts")


if __name__ == "__main__":
    main()
