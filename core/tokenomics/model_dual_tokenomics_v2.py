"""
Обновленная модель токеномики VOD.eco v2.0

Ключевые изменения:
1. Внутренний коин (VODCoin) для стейкинга и внутренних расчетов
2. Основной токен (VOD) выпускается только при подтверждении данных
3. 1 VOD = стоимость 1 м³ воды
4. Механика обмена застейканных коинов на токены
"""

from dataclasses import dataclass, field
from typing import Dict, List, Optional
from datetime import datetime, timedelta
import math

# Константы
EARTH_WATER_VOLUME_M3 = 1.386e15  # 1.386 млрд км³ = 1.386 × 10¹⁵ м³
WATER_PRICE_PER_M3 = 1.3  # $1.3 за м³
MAX_EMISSION_MULTIPLIER = 1e-9  # 1 миллиард токенов (1:1,000,000,000 от объема воды)

@dataclass
class DataConfirmation:
    """Подтверждение данных (инициативы, датчики, исследования)"""
    confirmation_id: str
    data_type: str  # 'initiative', 'sensor', 'research'
    water_volume_m3: float
    confirmed_at: datetime
    verified: bool = False

@dataclass
class PresaleTier:
    """Уровень пресейла"""
    tier: int
    discount_percent: float
    max_tokens: float
    price_per_token: float
    vesting_months: int

@dataclass
class TokenomicsV2:
    """
    Обновленная модель токеномики
    """
    # Внутренний коин (VODCoin)
    vod_coin_supply: float = 0.0
    vod_coin_staked: float = 0.0
    vod_coin_price: float = 0.1  # Начальная цена внутреннего коина
    
    # Основной токен (VOD) - выпускается только при подтверждении
    vod_max_supply: float = 1_000_000_000  # 1 миллиард (кратное отношение к объему воды)
    vod_current_supply: float = 0.0
    vod_price: float = WATER_PRICE_PER_M3  # 1 VOD = $1.3 (стоимость 1 м³)
    
    # Подтвержденные данные
    confirmed_data: List[DataConfirmation] = field(default_factory=list)
    total_confirmed_water_m3: float = 0.0
    
    # Пресейлы
    presale_tiers: List[PresaleTier] = field(default_factory=list)
    presale_sold: float = 0.0
    
    # Аирдропы
    airdrop_pool: float = 0.0
    airdrop_distributed: float = 0.0
    
    # Стейкинг
    staking_apy: float = 12.0  # 12% годовых
    staking_periods: Dict[int, float] = field(default_factory=lambda: {
        1: 8.0,   # 1-3 месяца: 8%
        3: 10.0,  # 4-6 месяцев: 10%
        6: 12.0,  # 7-12 месяцев: 12%
        12: 15.0, # 13-24 месяца: 15%
        24: 17.0  # 25+ месяцев: 17%
    })
    
    def __post_init__(self):
        """Инициализация уровней пресейла"""
        if not self.presale_tiers:
            self.presale_tiers = [
                PresaleTier(1, 50.0, 10_000_000, 0.65, 12),  # 50% скидка, $0.65
                PresaleTier(2, 40.0, 20_000_000, 0.78, 18),  # 40% скидка, $0.78
                PresaleTier(3, 30.0, 30_000_000, 0.91, 24),  # 30% скидка, $0.91
            ]
    
    def calculate_max_emission(self) -> float:
        """
        Расчет максимальной эмиссии на основе кратного отношения к объему воды
        """
        # Максимальная эмиссия = объем воды × множитель
        max_emission = EARTH_WATER_VOLUME_M3 * MAX_EMISSION_MULTIPLIER
        return min(max_emission, self.vod_max_supply)
    
    def mint_vod_coin(self, amount: float) -> float:
        """
        Выпуск внутреннего коина (VODCoin)
        Используется для стейкинга и внутренних расчетов
        """
        self.vod_coin_supply += amount
        return self.vod_coin_supply
    
    def stake_vod_coin(self, amount: float, period_months: int) -> Dict:
        """
        Стейкинг внутреннего коина
        """
        if amount <= 0:
            return {"error": "Amount must be positive"}
        
        if amount > self.vod_coin_supply:
            return {"error": "Insufficient VODCoin supply"}
        
        # Определяем APY на основе периода
        apy = self.get_staking_apy(period_months)
        
        self.vod_coin_staked += amount
        
        return {
            "staked_amount": amount,
            "period_months": period_months,
            "apy": apy,
            "estimated_reward": amount * (apy / 100) * (period_months / 12)
        }
    
    def get_staking_apy(self, period_months: int) -> float:
        """Получить APY для периода стейкинга"""
        if period_months >= 24:
            return self.staking_periods[24]
        elif period_months >= 12:
            return self.staking_periods[12]
        elif period_months >= 6:
            return self.staking_periods[6]
        elif period_months >= 3:
            return self.staking_periods[3]
        else:
            return self.staking_periods[1]
    
    def confirm_data(self, data_type: str, water_volume_m3: float) -> DataConfirmation:
        """
        Подтверждение данных (инициативы, датчики, исследования)
        При подтверждении выпускаются токены VOD
        """
        confirmation = DataConfirmation(
            confirmation_id=f"conf_{len(self.confirmed_data) + 1}",
            data_type=data_type,
            water_volume_m3=water_volume_m3,
            confirmed_at=datetime.now(),
            verified=True
        )
        
        self.confirmed_data.append(confirmation)
        self.total_confirmed_water_m3 += water_volume_m3
        
        # Выпуск токенов VOD при подтверждении
        tokens_to_mint = self.calculate_tokens_for_water(water_volume_m3)
        self.mint_vod(tokens_to_mint)
        
        return confirmation
    
    def calculate_tokens_for_water(self, water_volume_m3: float) -> float:
        """
        Расчет количества токенов для объема воды
        1 VOD = стоимость 1 м³ воды = $1.3
        """
        # Количество токенов = объем воды (так как 1 VOD = 1 м³ по стоимости)
        return water_volume_m3
    
    def mint_vod(self, amount: float) -> float:
        """
        Выпуск основного токена VOD
        Выпускается только при подтверждении данных
        """
        max_emission = self.calculate_max_emission()
        if self.vod_current_supply + amount > max_emission:
            amount = max(0, max_emission - self.vod_current_supply)
        
        self.vod_current_supply += amount
        return self.vod_current_supply
    
    def exchange_staked_coins_for_tokens(
        self, 
        staked_coins: float, 
        staking_period_months: int
    ) -> Dict:
        """
        Обмен застейканных коинов на токены VOD
        """
        if staked_coins > self.vod_coin_staked:
            return {"error": "Insufficient staked coins"}
        
        # Расчет обменного курса на основе периода стейкинга
        exchange_rate = self.calculate_exchange_rate(staking_period_months)
        
        # Количество токенов VOD за коины
        vod_tokens = staked_coins * exchange_rate
        
        # Проверка доступности токенов
        if vod_tokens > self.vod_current_supply:
            return {"error": "Insufficient VOD tokens available"}
        
        # Обмен
        self.vod_coin_staked -= staked_coins
        self.vod_current_supply -= vod_tokens
        
        return {
            "exchanged_coins": staked_coins,
            "received_tokens": vod_tokens,
            "exchange_rate": exchange_rate
        }
    
    def calculate_exchange_rate(self, staking_period_months: int) -> float:
        """
        Расчет обменного курса коинов на токены
        Зависит от периода стейкинга и подтвержденных данных
        """
        base_rate = self.vod_price / self.vod_coin_price
        
        # Бонус за длительный стейкинг
        period_bonus = min(staking_period_months / 24, 1.0) * 0.2  # До 20% бонуса
        
        # Бонус за подтвержденные данные
        confirmation_bonus = min(
            self.total_confirmed_water_m3 / (EARTH_WATER_VOLUME_M3 * 0.01), 
            1.0
        ) * 0.1  # До 10% бонуса
        
        exchange_rate = base_rate * (1 + period_bonus + confirmation_bonus)
        
        return exchange_rate
    
    def presale_purchase(self, tier: int, amount_usd: float) -> Dict:
        """
        Покупка на пресейле
        """
        if tier < 1 or tier > len(self.presale_tiers):
            return {"error": "Invalid tier"}
        
        presale = self.presale_tiers[tier - 1]
        
        # Количество токенов с учетом скидки
        tokens = amount_usd / presale.price_per_token
        
        if self.presale_sold + tokens > presale.max_tokens:
            return {"error": "Tier sold out"}
        
        self.presale_sold += tokens
        
        return {
            "tier": tier,
            "amount_usd": amount_usd,
            "tokens": tokens,
            "discount": presale.discount_percent,
            "vesting_months": presale.vesting_months
        }
    
    def distribute_airdrop(self, recipients: List[str], amount_per_recipient: float) -> Dict:
        """
        Распределение аирдропа
        """
        total_amount = len(recipients) * amount_per_recipient
        
        if total_amount > self.airdrop_pool:
            return {"error": "Insufficient airdrop pool"}
        
        self.airdrop_distributed += total_amount
        self.airdrop_pool -= total_amount
        
        return {
            "recipients": len(recipients),
            "total_distributed": total_amount,
            "per_recipient": amount_per_recipient
        }
    
    def get_statistics(self) -> Dict:
        """
        Получить статистику токеномики
        """
        max_emission = self.calculate_max_emission()
        emission_percentage = (self.vod_current_supply / max_emission * 100) if max_emission > 0 else 0
        
        return {
            "vod_coin": {
                "supply": self.vod_coin_supply,
                "staked": self.vod_coin_staked,
                "price": self.vod_coin_price,
                "available": self.vod_coin_supply - self.vod_coin_staked
            },
            "vod_token": {
                "current_supply": self.vod_current_supply,
                "max_supply": max_emission,
                "emission_percentage": emission_percentage,
                "price": self.vod_price,
                "market_cap": self.vod_current_supply * self.vod_price
            },
            "confirmed_data": {
                "total_confirmations": len(self.confirmed_data),
                "total_water_m3": self.total_confirmed_water_m3,
                "by_type": {
                    data_type: sum(1 for d in self.confirmed_data if d.data_type == data_type)
                    for data_type in ['initiative', 'sensor', 'research']
                }
            },
            "presale": {
                "sold": self.presale_sold,
                "tiers": [
                    {
                        "tier": tier.tier,
                        "sold": min(self.presale_sold, tier.max_tokens),
                        "max": tier.max_tokens,
                        "discount": tier.discount_percent
                    }
                    for tier in self.presale_tiers
                ]
            },
            "airdrop": {
                "pool": self.airdrop_pool,
                "distributed": self.airdrop_distributed
            }
        }

