from fastapi import APIRouter, HTTPException
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate

from config import settings
from fetcher import compute_stats, fetch_samples

router = APIRouter()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.3,
    max_tokens=400,
    groq_api_key=settings.groq_api_key,
)

prompt = ChatPromptTemplate.from_template(
    """You are a cybersecurity analyst writing a concise threat intelligence brief.
Based on today's malware feed:
- Total samples: {total}
- Critical: {critical}, High: {high}, Medium: {medium}, Low: {low}
- Top malware families: {top_families}
- Most common file types: {file_types}

Write a 3-sentence professional threat intelligence brief. Be specific about the families and file types. Do not use bullet points."""
)

chain = prompt | llm


@router.get("/ai-brief")
async def ai_brief():
    try:
        samples = await fetch_samples()
        stats = compute_stats(samples)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Data fetch error: {e}")

    families = ", ".join(f["name"] for f in stats["top_families"][:5]) or "Unknown"
    types = ", ".join(f["type"] for f in stats["file_types"][:5]) or "Unknown"

    try:
        result = chain.invoke({
            "total": stats["total"],
            "critical": stats["critical"],
            "high": stats["high"],
            "medium": stats["medium"],
            "low": stats["low"],
            "top_families": families,
            "file_types": types,
        })
        return {"brief": result.content}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"LLM error: {e}")
