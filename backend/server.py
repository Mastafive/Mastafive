from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    subject: Optional[str] = Field(default="", max_length=300)
    message: str = Field(min_length=1, max_length=5000)


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str
    read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ---------- Auth helper ----------

def require_admin(x_admin_password: Optional[str]) -> None:
    if not ADMIN_PASSWORD:
        raise HTTPException(status_code=500, detail="Admin password not configured")
    if x_admin_password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password")


# ---------- Routes ----------

@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# Contact form: public submission
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(payload: ContactMessageCreate):
    msg = ContactMessage(
        name=payload.name.strip(),
        email=payload.email,
        subject=(payload.subject or "").strip(),
        message=payload.message.strip(),
    )
    await db.contact_messages.insert_one(msg.dict())
    logger.info("New contact message stored id=%s from=%s", msg.id, msg.email)
    return msg


# Admin: list all messages
@api_router.get("/admin/contact", response_model=List[ContactMessage])
async def list_contact_messages(x_admin_password: Optional[str] = Header(default=None)):
    require_admin(x_admin_password)
    items = (
        await db.contact_messages.find({}, {"_id": 0})
        .sort("created_at", -1)
        .to_list(1000)
    )
    return [ContactMessage(**i) for i in items]


# Admin: mark message as read / unread
@api_router.patch("/admin/contact/{message_id}")
async def update_contact_message(
    message_id: str,
    read: bool,
    x_admin_password: Optional[str] = Header(default=None),
):
    require_admin(x_admin_password)
    res = await db.contact_messages.update_one(
        {"id": message_id}, {"$set": {"read": read}}
    )
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"ok": True}


# Admin: delete a message
@api_router.delete("/admin/contact/{message_id}")
async def delete_contact_message(
    message_id: str,
    x_admin_password: Optional[str] = Header(default=None),
):
    require_admin(x_admin_password)
    res = await db.contact_messages.delete_one({"id": message_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"ok": True}


# Admin: lightweight password verification
@api_router.post("/admin/verify")
async def admin_verify(x_admin_password: Optional[str] = Header(default=None)):
    require_admin(x_admin_password)
    return {"ok": True}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
