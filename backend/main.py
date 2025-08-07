# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from telethon import TelegramClient
from telethon.errors import UsernameInvalidError, UsernameNotOccupiedError
from dotenv import load_dotenv
import os

load_dotenv()
API_ID = int(os.getenv("API_ID"))
API_HASH = os.getenv("API_HASH")
SESSION_NAME = os.getenv("SESSION_NAME")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/resolve-telegram")
async def resolve_telegram(username: str):
    if not username.startswith("@"):
        username = "@" + username

    client = TelegramClient(SESSION_NAME, API_ID, API_HASH)
    await client.connect()

    try:
        if not await client.is_user_authorized():
            raise HTTPException(status_code=401, detail="Клиент не авторизован")

        entity = await client.get_entity(username)
        return {
            "user_id": entity.id,
            "first_name": getattr(entity, "first_name", ""),
            "last_name": getattr(entity, "last_name", ""),
        }

    except (UsernameInvalidError, UsernameNotOccupiedError, ValueError):
        raise HTTPException(status_code=404, detail="Username не найден")
    finally:
        await client.disconnect()
