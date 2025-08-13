from fastapi import APIRouter, HTTPException
from prisma import Prisma
from app.models.fir_model import FIRForm

router = APIRouter()
db = Prisma()

@router.on_event("startup")
async def connect_db():
    await db.connect()

@router.on_event("shutdown")
async def disconnect_db():
    await db.disconnect()

@router.post("/fir")
async def submit_fir(fir: FIRForm):
    try:
        created = await db.fir.create(
            data={
                "complainantName": fir.complainantName,
                "email": fir.email,
                "fatherName": fir.fatherName,
                "age": fir.age,
                "gender": fir.gender.value if fir.gender and fir.gender.value else None,
                "occupation": fir.occupation,
                "address": fir.address,
                "city": fir.city,
                "state": fir.state,
                "phoneNumber": fir.phoneNumber,
                "incidentDate": fir.incidentDate,
                "incidentTime": fir.incidentTime,
                "incidentLocation": fir.incidentLocation,
                "crimeType": fir.crimeType,
                "incidentDescription": fir.incidentDescription,
                "urgencyLevel": fir.urgencyLevel.value if fir.urgencyLevel and fir.urgencyLevel.value else None,
                "witnessDetails": fir.witnessDetails,
                "evidenceDetails": fir.evidenceDetails,
                "previousComplaint": fir.previousComplaint,
                "previousComplaintDetails": fir.previousComplaintDetails,
            }
        )
        return {"message": "FIR submitted successfully", "data": created}
    except Exception as e:
        print("Error creating FIR:", e)  # <-- log full error
        raise HTTPException(status_code=500, detail=str(e))
