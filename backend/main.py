from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import mammoth
import easyocr
from PIL import Image
import aiofiles
import os
from pdf2image import convert_from_path
import asyncio
import httpx

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Uploads ----------------
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ---------------- EasyOCR ----------------
reader = easyocr.Reader(["en"])

# ---------------- Mistral 7B ----------------
MISTRAL_API_KEY = "Is5e7BNDf7kozkKZnu4ePoPvPC0bjNnS"
MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"

# ---------------- Async OCR ----------------
async def run_ocr(img: Image.Image):
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, lambda: reader.readtext(img))
    return " ".join([r[1] for r in result])

# ---------------- Async Mistral Summary ----------------
async def get_summary(text: str):
    chunk_size = 2000
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
    summary = ""
    
    async with httpx.AsyncClient() as client:
        for chunk in chunks:
            headers = {"Authorization": f"Bearer {MISTRAL_API_KEY}"}
            payload = {
                "text": chunk,
                "instructions": "Summarize this legal document concisely and accurately."
            }
            try:
                resp = await client.post(MISTRAL_API_URL, json=payload, headers=headers, timeout=60)
                data = resp.json()
                summary += data.get("summary", chunk) + " "
            except Exception as e:
                print("Mistral API error:", e, resp.text if 'resp' in locals() else "")
                summary += chunk + " "
    return summary.strip()

# ---------------- Process Document ----------------
@app.post("/process-doc")
async def process_doc(file: UploadFile = File(...)):
    temp_path = os.path.join(UPLOAD_DIR, file.filename)
    try:
        # Save file
        async with aiofiles.open(temp_path, "wb") as out_file:
            await out_file.write(await file.read())

        text = ""

        # PDF
        if file.content_type == "application/pdf":
            with pdfplumber.open(temp_path) as pdf:
                text = "\n".join(page.extract_text() or "" for page in pdf.pages)
            if len(text.strip()) < 20:  # fallback OCR
                images = convert_from_path(temp_path)
                for img in images:
                    text += await run_ocr(img)

        # DOCX
        elif file.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            with open(temp_path, "rb") as docx_file:
                result = mammoth.extract_raw_text(docx_file)
                text = result.value

        # Image
        elif file.content_type.startswith("image/"):
            img = Image.open(temp_path)
            text = await run_ocr(img)

        else:
            return {"error": "Unsupported file type"}

        # Get summary from Mistral
        summary = await get_summary(text)

        return {"extracted_text": text, "summary": summary}

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

# ---------------- QnA ----------------
@app.post("/qna")
async def qna(question: str = Form(...), document_text: str = Form(...)):
    # Simple keyword-based extraction
    words = question.split()
    sentences = document_text.split(".")
    answer = next(
        (s for s in sentences if any(w.lower() in s.lower() for w in words)),
        "No answer found"
    )
    return {"answer": answer}

# ---------------- Root ----------------
@app.get("/")
def read_root():
    return {"message": "LegalAI backend running with EasyOCR + Mistral 7B"}
