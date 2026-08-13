from typing import Optional
from fastapi import APIRouter, Query
from fetcher import fetch_samples

router = APIRouter()


@router.get("/samples")
async def get_samples(
    limit: int = Query(50, ge=1, le=200),
    threat_level: Optional[str] = Query(None),
):
    samples = await fetch_samples()
    if threat_level:
        samples = [s for s in samples if s["threat_level"] == threat_level.upper()]
    return {"total": len(samples), "samples": samples[:limit]}
