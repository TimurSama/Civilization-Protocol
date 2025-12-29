from fastapi import APIRouter
from fastapi.responses import JSONResponse, FileResponse
import json
import csv
from io import StringIO
from ..database import JSONDatabase

router = APIRouter()
db = JSONDatabase("data/users.json")

@router.get("/users")
async def get_all_users():
    users = db.get_all_users()
    return [{
        "telegram_username": user.telegram_username,
        "balance": user.balance,
        "staked": user.staked,
        "total_actions": len(user.actions),
        "created_at": user.created_at
    } for user in users]

@router.get("/users/json")
async def get_users_json():
    users = db.get_all_users()
    data = [{
        "telegram_username": user.telegram_username,
        "balance": user.balance,
        "staked": user.staked,
        "total_actions": len(user.actions),
        "created_at": user.created_at.isoformat() if hasattr(user.created_at, 'isoformat') else str(user.created_at)
    } for user in users]
    
    return JSONResponse(content=data)

@router.get("/users/csv")
async def get_users_csv():
    users = db.get_all_users()
    output = StringIO()
    writer = csv.writer(output)
    
    # Заголовки
    writer.writerow(["Telegram Username", "Balance", "Staked", "Total Actions", "Created At"])
    
    # Данные
    for user in users:
        writer.writerow([
            user.telegram_username,
            user.balance,
            user.staked,
            len(user.actions),
            user.created_at.isoformat() if hasattr(user.created_at, 'isoformat') else str(user.created_at)
        ])
    
    output.seek(0)
    from fastapi.responses import Response
    return Response(content=output.getvalue(), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=users.csv"}) 