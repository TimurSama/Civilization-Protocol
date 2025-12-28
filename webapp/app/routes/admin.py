from fastapi import APIRouter
from fastapi.responses import JSONResponse, FileResponse
import json
import csv
from io import StringIO
from ..database import Database

router = APIRouter()
db = Database()

@router.get("/users")
async def get_all_users():
    users = db.get_all_users()
    return [{
        "telegram_username": user.telegram_username,
        "claimed_tokens": user.claimed_tokens,
        "staked_tokens": user.staked_tokens,
        "total_actions": len(user.actions),
        "created_at": user.created_at
    } for user in users]

@router.get("/users/json")
async def get_users_json():
    users = db.get_all_users()
    data = [{
        "telegram_username": user.telegram_username,
        "claimed_tokens": user.claimed_tokens,
        "staked_tokens": user.staked_tokens,
        "total_actions": len(user.actions),
        "created_at": user.created_at
    } for user in users]
    
    return JSONResponse(content=data)

@router.get("/users/csv")
async def get_users_csv():
    users = db.get_all_users()
    output = StringIO()
    writer = csv.writer(output)
    
    # Заголовки
    writer.writerow(["Telegram Username", "Claimed Tokens", "Staked Tokens", "Total Actions", "Created At"])
    
    # Данные
    for user in users:
        writer.writerow([
            user.telegram_username,
            user.claimed_tokens,
            user.staked_tokens,
            len(user.actions),
            user.created_at
        ])
    
    output.seek(0)
    return FileResponse(
        path=output,
        media_type="text/csv",
        filename="users.csv"
    ) 