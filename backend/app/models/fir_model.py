from typing import Optional
from pydantic import BaseModel, EmailStr
from enum import Enum

class Gender(str, Enum):
    male = "male"
    female = "female"
    other = "other"
    unknown = ""

class UrgencyLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"
    unknown = ""

class FIRForm(BaseModel):
    complainantName: str
    email: EmailStr
    fatherName: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[Gender] = Gender.unknown
    occupation: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    phoneNumber: Optional[str] = None
    incidentDate: Optional[str] = None
    incidentTime: Optional[str] = None
    incidentLocation: Optional[str] = None
    crimeType: Optional[str] = None
    incidentDescription: Optional[str] = None
    urgencyLevel: Optional[UrgencyLevel] = UrgencyLevel.unknown
    witnessDetails: Optional[str] = None
    evidenceDetails: Optional[str] = None
    previousComplaint: Optional[bool] = None
    previousComplaintDetails: Optional[str] = None
