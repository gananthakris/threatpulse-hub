from fastapi import APIRouter
from fetcher import compute_stats, fetch_samples

router = APIRouter()


@router.get("/stats")
async def get_stats():
    samples = await fetch_samples()
    return compute_stats(samples)
