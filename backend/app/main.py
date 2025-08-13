from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import T5Tokenizer, T5ForConditionalGeneration

from app.routes import auth, user, assistant, fir

app = FastAPI()

# -------------------------------
# CORS setup
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Root endpoint
# -------------------------------
@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

# -------------------------------
# Include existing routers
# -------------------------------
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(user.router, prefix="/user", tags=["User"])
app.include_router(assistant.router, prefix="/assistant", tags=["Assistant"])
app.include_router(fir.router, prefix="/fir", tags=["FIR"])

# -------------------------------
# Legal Assistant Integration
# -------------------------------
class LegalQuestion(BaseModel):
    question: str

# Load pre-trained Flan-T5
tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-small")
model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-small")

# System prompt to guide model
system_prompt = (
    "You are a helpful legal assistant. "
    "Answer legal questions concisely and accurately, "
    "based on Indian law. "
    "If unsure, say 'I am not a lawyer, but...'."
    "You are a legal assistant. Only provide advice based on Indian law. "
    "Answer clearly and step by step. If unsure, explain what a person should do legally."
    "but never give unsafe instructions."
)

@app.post("/legal/ask")
async def ask_legal(q: LegalQuestion):
    prompt = f"{system_prompt}\nQuestion: {q.question}\nAnswer:"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(
        **inputs,
        max_length=250,
        num_beams=4,
        early_stopping=True
    )
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"answer": answer}
