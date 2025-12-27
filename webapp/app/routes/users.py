from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os
from ..models import User, UserCreate, UserUpdate, UserAction
from ..database import JSONDatabase
from typing import List
import json
import csv
from datetime import datetime

router = APIRouter()
db = JSONDatabase("data/users.json")

@router.post("/register")
async def register_user(user: UserCreate):
    existing_user = db.get_user(user.telegram_username)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    new_user = User(
        telegram_username=user.telegram_username,
        created_at=datetime.now()
    )
    db.create_user(new_user)
    return {"message": "User registered successfully"}

@router.post("/claim")
async def claim_tokens(user: UserCreate):
    existing_user = db.get_user(user.telegram_username)
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    action = UserAction(
        action_type="claim",
        amount=10.0,
        timestamp=datetime.now()
    )
    db.update_user(user.telegram_username, action)
    return {"message": "Tokens claimed successfully"}

@router.post("/stake")
async def stake_tokens(user: UserUpdate):
    existing_user = db.get_user(user.telegram_username)
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if existing_user.claimed_tokens < user.amount:
        raise HTTPException(status_code=400, detail="Not enough tokens")
    
    action = UserAction(
        action_type="stake",
        amount=user.amount,
        timestamp=datetime.now()
    )
    db.update_user(user.telegram_username, action)
    return {"message": "Tokens staked successfully"}

@router.get("/status/{telegram_username}")
async def get_user_status(telegram_username: str):
    user = db.get_user(telegram_username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "telegram_username": user.telegram_username,
        "claimed_tokens": user.claimed_tokens,
        "staked_tokens": user.staked_tokens,
        "total_actions": len(user.actions)
    }

@router.get("/docs/{filename}")
async def get_documentation(filename: str):
    docs_path = os.path.join("..", "..", "docs", filename)
    if not os.path.exists(docs_path):
        raise HTTPException(status_code=404, detail="Документ не найден")
    return FileResponse(docs_path)

@router.get("/docs")
async def list_documents():
    docs_path = os.path.join("..", "..", "docs")
    files = [f for f in os.listdir(docs_path) if os.path.isfile(os.path.join(docs_path, f))]
    return {"documents": files} 