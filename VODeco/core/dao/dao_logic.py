from dataclasses import dataclass
from typing import Dict, List, Optional
from enum import Enum
import json
from datetime import datetime, timedelta

class DAORole(Enum):
    MEMBER = "member"
    DELEGATE = "delegate"
    GOVERNOR = "governor"

@dataclass
class Proposal:
    id: str
    title: str
    description: str
    creator: str
    created_at: datetime
    voting_end: datetime
    votes_for: int = 0
    votes_against: int = 0
    status: str = "active"

class DAO:
    def __init__(self):
        self.members: Dict[str, DAORole] = {}
        self.proposals: Dict[str, Proposal] = {}
        self.voting_power: Dict[str, float] = {}
        self.rewards_pool: float = 0.0

    def add_member(self, address: str, role: DAORole) -> None:
        """Добавление нового участника DAO"""
        self.members[address] = role
        self.voting_power[address] = 1.0  # Базовая сила голоса

    def create_proposal(self, title: str, description: str, creator: str, 
                       voting_duration_days: int = 7) -> str:
        """Создание нового предложения"""
        proposal_id = f"prop_{len(self.proposals) + 1}"
        now = datetime.now()
        proposal = Proposal(
            id=proposal_id,
            title=title,
            description=description,
            creator=creator,
            created_at=now,
            voting_end=now + timedelta(days=voting_duration_days)
        )
        self.proposals[proposal_id] = proposal
        return proposal_id

    def vote(self, proposal_id: str, voter: str, vote_for: bool) -> bool:
        """Голосование по предложению"""
        if proposal_id not in self.proposals:
            return False
        if voter not in self.members:
            return False

        proposal = self.proposals[proposal_id]
        if datetime.now() > proposal.voting_end:
            return False

        voting_power = self.voting_power.get(voter, 0.0)
        if vote_for:
            proposal.votes_for += voting_power
        else:
            proposal.votes_against += voting_power

        return True

    def calculate_rewards(self, total_reward: float) -> Dict[str, float]:
        """Расчет вознаграждений для участников DAO"""
        total_voting_power = sum(self.voting_power.values())
        if total_voting_power == 0:
            return {}

        return {
            address: (power / total_voting_power) * total_reward
            for address, power in self.voting_power.items()
        } 