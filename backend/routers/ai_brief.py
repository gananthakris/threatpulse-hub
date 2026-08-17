from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate

from config import settings

router = APIRouter()

llm = ChatGroq(
    model="openai/gpt-oss-20b",
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


class StatsPayload(BaseModel):
    total: int
    critical: int
    high: int
    medium: int
    low: int
    top_families: list[str]
    file_types: list[str]


@router.post("/ai-brief")
async def ai_brief(payload: StatsPayload):
    families = ", ".join(payload.top_families[:5]) or "various unknown families"
    types = ", ".join(payload.file_types[:5]) or "various file types"

    try:
        result = chain.invoke({
            "total": payload.total,
            "critical": payload.critical,
            "high": payload.high,
            "medium": payload.medium,
            "low": payload.low,
            "top_families": families,
            "file_types": types,
        })
        return {"brief": result.content}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"LLM error: {e}")
