from fastapi import APIRouter
from prisma import Prisma

router = APIRouter()
db = Prisma()

@router.on_event("startup")
async def connect_db():
    await db.connect()

@router.on_event("shutdown")
async def disconnect_db():
    await db.disconnect()

# Example test endpoint
@router.get("/users")
async def get_users():
    return await db.user.find_many()
