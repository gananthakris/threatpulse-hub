from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import ai_brief, samples, stats

app = FastAPI(title="ThreatPulse API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stats.router)
app.include_router(samples.router)
app.include_router(ai_brief.router)


@app.get("/health")
def health():
    return {"status": "ok"}
