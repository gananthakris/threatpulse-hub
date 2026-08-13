import csv
import io
from datetime import datetime

import httpx

MALWAREBAZAAR_URL = "https://bazaar.abuse.ch/export/csv/recent/"

CRITICAL_SIGS = {"emotet", "lockbit", "blackcat", "cobalt", "qakbot", "ryuk", "conti"}
HIGH_SIGS = {"njrat", "asyncrat", "remcos", "agent tesla", "xworm", "redline", "vidar"}
MEDIUM_SIGS = {"xmrig", "mirai", "nanocore", "darkcomet"}


def _score(signature: str, file_type: str) -> tuple[str, int]:
    sig = signature.lower()
    for s in CRITICAL_SIGS:
        if s in sig:
            return "CRITICAL", 90
    for s in HIGH_SIGS:
        if s in sig:
            return "HIGH", 70
    for s in MEDIUM_SIGS:
        if s in sig:
            return "MEDIUM", 50
    if file_type in ("exe", "dll", "ps1", "vbs", "bat", "js"):
        return "HIGH", 65
    if file_type in ("doc", "docx", "xls", "xlsx", "pdf"):
        return "MEDIUM", 45
    return "LOW", 20


async def fetch_samples() -> list[dict]:
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.get(MALWAREBAZAAR_URL)
        resp.raise_for_status()

    lines = [l for l in resp.text.splitlines() if not l.startswith("#")]
    reader = csv.DictReader(lines)

    samples = []
    for row in reader:
        sha256 = row.get("sha256_hash", "").strip()
        if not sha256:
            continue
        file_type = row.get("file_type", "unknown").strip().lower().lstrip(".")
        signature = row.get("signature", "Unknown").strip() or "Unknown"
        threat_level, threat_score = _score(signature, file_type)

        raw_date = row.get("first_seen", "").strip()
        try:
            first_seen = datetime.strptime(raw_date, "%Y-%m-%d %H:%M:%S").isoformat()
        except ValueError:
            first_seen = datetime.utcnow().isoformat()

        samples.append({
            "id": sha256,
            "sha256_hash": sha256,
            "file_name": row.get("file_name", "unknown").strip(),
            "file_type": file_type,
            "signature": signature,
            "first_seen": first_seen,
            "threat_level": threat_level,
            "threat_score": threat_score,
            "tags": [t.strip() for t in row.get("tags", "").split(",") if t.strip()],
        })

    return sorted(samples, key=lambda x: x["threat_score"], reverse=True)


def compute_stats(samples: list[dict]) -> dict:
    from collections import Counter

    levels = Counter(s["threat_level"] for s in samples)
    families = Counter(
        s["signature"] for s in samples if s["signature"] != "Unknown"
    )
    types = Counter(s["file_type"] for s in samples)

    return {
        "total": len(samples),
        "critical": levels.get("CRITICAL", 0),
        "high": levels.get("HIGH", 0),
        "medium": levels.get("MEDIUM", 0),
        "low": levels.get("LOW", 0),
        "top_families": [{"name": k, "count": v} for k, v in families.most_common(10)],
        "file_types": [{"type": k, "count": v} for k, v in types.most_common(10)],
    }
