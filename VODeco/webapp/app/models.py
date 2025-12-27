from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserAction(BaseModel):
    telegram_username: str
    action: str
    amount: Optional[float] = None
    timestamp: datetime = datetime.now()

class User(BaseModel):
    telegram_username: str
    balance: float = 0.0
    staked: float = 0.0
    last_claim: Optional[datetime] = None
    referral_code: Optional[str] = None
    referred_by: Optional[str] = None
    votes: dict = {}  # {proposal_id: vote_option}
    actions: List[UserAction] = []
    created_at: datetime = datetime.now()

class UserCreate(BaseModel):
    telegram_username: str
    referral_code: Optional[str] = None

class UserUpdate(BaseModel):
    balance: Optional[float] = None
    staked: Optional[float] = None
    last_claim: Optional[datetime] = None
    referral_code: Optional[str] = None
    referred_by: Optional[str] = None
    votes: Optional[dict] = None 