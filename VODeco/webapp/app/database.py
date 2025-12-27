import json
import os
from typing import List, Optional
from datetime import datetime
from .models import User, UserAction, UserCreate, UserUpdate

class JSONDatabase:
    def __init__(self, file_path: str = "data/users.json"):
        self.file_path = file_path
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        if not os.path.exists(file_path):
            self._save_data({})

    def _load_data(self) -> dict:
        try:
            with open(self.file_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {}

    def _save_data(self, data: dict):
        with open(self.file_path, 'w') as f:
            json.dump(data, f, default=str)

    def get_user(self, telegram_username: str) -> Optional[User]:
        data = self._load_data()
        user_data = data.get(telegram_username)
        if user_data:
            return User(**user_data)
        return None

    def create_user(self, user: UserCreate) -> User:
        data = self._load_data()
        if user.telegram_username in data:
            raise ValueError("User already exists")
        
        new_user = User(
            telegram_username=user.telegram_username,
            referral_code=user.referral_code
        )
        data[user.telegram_username] = new_user.dict()
        self._save_data(data)
        return new_user

    def update_user(self, telegram_username: str, action: UserAction) -> User:
        data = self._load_data()
        if telegram_username not in data:
            raise ValueError("User not found")
        
        user_data = data[telegram_username]
        user = User(**user_data)
        
        if action.action == "claim":
            user.balance += action.amount
            user.last_claim = datetime.now()
        elif action.action == "stake":
            user.balance -= action.amount
            user.staked += action.amount
        elif action.action == "unstake":
            user.balance += action.amount
            user.staked -= action.amount
        
        user.actions.append(action)
        data[telegram_username] = user.dict()
        self._save_data(data)
        return user

    def get_all_users(self) -> List[User]:
        data = self._load_data()
        return [User(**user_data) for user_data in data.values()]

# Заглушки для будущей интеграции
def send_to_telegram_api(username: str, message: str) -> None:
    pass

def save_to_postgres(user: User) -> None:
    pass 