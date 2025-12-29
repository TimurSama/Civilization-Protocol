from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import FileResponse, Response
import os
from ..models import User, UserCreate, UserUpdate, UserAction
from ..database import JSONDatabase
from typing import List
import json
import csv
from datetime import datetime
from io import StringIO

router = APIRouter()
db = JSONDatabase("data/users.json")

@router.post("/register")
async def register_user(request: Request):
    # Получаем данные из body
    body = await request.json()
    
    # Поддержка формата из frontend (username вместо telegram_username)
    username = body.get("username") or body.get("telegram_username")
    referral_code = body.get("referral_code")
    
    if not username:
        raise HTTPException(status_code=400, detail="Username is required")
    
    user_data = UserCreate(telegram_username=username, referral_code=referral_code)
    
    existing_user = db.get_user(user_data.telegram_username)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    try:
        new_user = db.create_user(user_data)
        return {"message": "User registered successfully", "user": new_user.dict()}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/claim")
async def claim_tokens():
    # Упрощенная реализация для MVP
    # В реальной версии нужно получать username из токена/сессии
    return {"message": "Tokens claimed successfully", "amount": 100}

@router.post("/stake")
async def stake_tokens():
    # Упрощенная реализация для MVP
    return {"message": "Tokens staked successfully"}

@router.get("/status/{telegram_username}")
async def get_user_status(telegram_username: str):
    user = db.get_user(telegram_username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "telegram_username": user.telegram_username,
        "balance": user.balance,
        "staked": user.staked,
        "total_actions": len(user.actions),
        "last_claim": user.last_claim.isoformat() if user.last_claim else None
    }

@router.get("/users")
async def get_all_users():
    users = db.get_all_users()
    return [{
        "username": user.telegram_username,
        "balance": user.balance,
        "staked": user.staked,
        "last_claim": user.last_claim.isoformat() if user.last_claim else None,
        "referral_code": user.referral_code,
        "referred_by": user.referred_by
    } for user in users]

@router.get("/proposals")
async def get_proposals():
    # Заглушка для предложений
    return []

@router.post("/vote")
async def vote(request: Request):
    # Заглушка для голосования
    await request.json()  # Прочитаем body, но не используем
    return {"message": "Vote recorded"}

@router.get("/export/json")
async def export_json():
    users = db.get_all_users()
    data = [{
        "username": user.telegram_username,
        "balance": user.balance,
        "staked": user.staked,
        "last_claim": user.last_claim.isoformat() if user.last_claim else None,
        "referral_code": user.referral_code,
        "referred_by": user.referred_by
    } for user in users]
    return Response(content=json.dumps(data, indent=2), media_type="application/json", headers={"Content-Disposition": "attachment; filename=users.json"})

@router.get("/export/csv")
async def export_csv():
    users = db.get_all_users()
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["Username", "Balance", "Staked", "Last Claim", "Referral Code", "Referred By"])
    for user in users:
        writer.writerow([
            user.telegram_username,
            user.balance,
            user.staked,
            user.last_claim.isoformat() if user.last_claim else "",
            user.referral_code or "",
            user.referred_by or ""
        ])
    return Response(content=output.getvalue(), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=users.csv"})

@router.get("/docs/{filename}")
async def get_documentation(filename: str):
    docs_path = os.path.join("docs", filename)
    if not os.path.exists(docs_path):
        docs_path = os.path.join("..", "docs", filename)
    if not os.path.exists(docs_path):
        raise HTTPException(status_code=404, detail="Документ не найден")
    return FileResponse(docs_path)

@router.get("/docs")
async def list_documents():
    docs_path = "docs"
    if not os.path.exists(docs_path):
        docs_path = os.path.join("..", "docs")
    if not os.path.exists(docs_path):
        return {"documents": []}
    files = [f for f in os.listdir(docs_path) if os.path.isfile(os.path.join(docs_path, f)) and f.endswith(('.txt', '.md', '.json'))]
    return {"documents": files}
