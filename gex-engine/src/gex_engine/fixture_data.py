from __future__ import annotations

import json
from pathlib import Path

_FIXTURE = Path(__file__).resolve().parents[2] / "fixtures" / "gc_chain.json"


def load_fixture() -> dict:
    return json.loads(_FIXTURE.read_text())
