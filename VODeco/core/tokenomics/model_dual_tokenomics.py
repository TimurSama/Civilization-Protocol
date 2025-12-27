from dataclasses import dataclass
from typing import Dict, List
import math

@dataclass
class TokenomicsModel:
    vod_eco_supply: float = 0.0
    vod_supply: float = 0.0
    water_assets: float = 0.0  # в м³
    dao_coefficient: float = 1.0
    pool_liquidity: float = 0.0

    def calculate_vod_eco_price(self, demand: float) -> float:
        """Расчет цены VODeco на основе спроса и предложения"""
        if self.vod_eco_supply == 0:
            return 0.0
        return demand / self.vod_eco_supply

    def mint_vod(self, water_volume: float) -> float:
        """Выпуск VOD токенов под обеспечение водой"""
        return water_volume  # 1 VOD = 1 м³ воды

    def calculate_irr(self, income: float, investment: float) -> float:
        """Расчет внутренней нормы доходности"""
        if investment == 0:
            return 0.0
        return (income / investment) - 1

    def calculate_exchange_rate(self, vod_eco_price: float) -> float:
        """Расчет курса обмена между токенами"""
        return vod_eco_price * self.dao_coefficient * self.pool_liquidity

    def update_water_assets(self, new_volume: float) -> None:
        """Обновление объема водных активов"""
        self.water_assets += new_volume
        self.vod_supply = self.mint_vod(self.water_assets)

class NFTMechanics:
    def __init__(self):
        self.nft_holders: Dict[str, float] = {}  # address: share

    def add_nft_holder(self, address: str, share: float) -> None:
        """Добавление держателя NFT с его долей"""
        self.nft_holders[address] = share

    def calculate_rewards(self, total_reward: float) -> Dict[str, float]:
        """Расчет вознаграждений для держателей NFT"""
        return {address: share * total_reward 
                for address, share in self.nft_holders.items()} 