from fastapi import APIRouter
from pydantic import BaseModel
import httpx
import os

router = APIRouter()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_ENDPOINT = "https://api.gemini.com/v1/assistant"  # adjust to your actual endpoint

class Query(BaseModel):
    question: str
    system_prompt: str = "You are a professional legal assistant. Answer concisely and accurately."

@router.post("/ask")
async def ask_gemini(query: Query):
    headers = {
        "Authorization": f"Bearer {GEMINI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "system_prompt": query.system_prompt,
        "user_input": query.question
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(GEMINI_ENDPOINT, headers=headers, json=payload)
        data = resp.json()
        # data["response"] or adjust based on Gemini API
        return {"answer": data.get("response", "No answer received")}
