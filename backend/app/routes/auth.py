from fastapi import APIRouter

router = APIRouter()

@router.get("/me")
async def me():
    return {"message": "No auth enabled for now"}
