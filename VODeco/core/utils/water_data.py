from dataclasses import dataclass
from typing import Dict, List
import json

@dataclass
class WaterSource:
    id: str
    name: str
    region: str
    volume_m3: float
    quality_score: float  # 0-100
    status: str
    last_update: str

class WaterData:
    def __init__(self):
        self.sources: Dict[str, WaterSource] = {}
        self.regions: Dict[str, List[str]] = {}  # region: [source_ids]
        self.total_volume: float = 0.0

    def add_source(self, source: WaterSource) -> None:
        """Добавление нового источника воды"""
        self.sources[source.id] = source
        if source.region not in self.regions:
            self.regions[source.region] = []
        self.regions[source.region].append(source.id)
        self.total_volume += source.volume_m3

    def get_region_sources(self, region: str) -> List[WaterSource]:
        """Получение всех источников в регионе"""
        source_ids = self.regions.get(region, [])
        return [self.sources[source_id] for source_id in source_ids]

    def calculate_region_volume(self, region: str) -> float:
        """Расчет общего объема воды в регионе"""
        sources = self.get_region_sources(region)
        return sum(source.volume_m3 for source in sources)

    def to_json(self) -> str:
        """Сериализация данных в JSON"""
        data = {
            "sources": {
                source_id: {
                    "id": source.id,
                    "name": source.name,
                    "region": source.region,
                    "volume_m3": source.volume_m3,
                    "quality_score": source.quality_score,
                    "status": source.status,
                    "last_update": source.last_update
                }
                for source_id, source in self.sources.items()
            },
            "regions": self.regions,
            "total_volume": self.total_volume
        }
        return json.dumps(data, indent=2)

    @classmethod
    def from_json(cls, json_str: str) -> 'WaterData':
        """Десериализация данных из JSON"""
        data = json.loads(json_str)
        water_data = cls()
        
        for source_id, source_data in data["sources"].items():
            source = WaterSource(
                id=source_data["id"],
                name=source_data["name"],
                region=source_data["region"],
                volume_m3=source_data["volume_m3"],
                quality_score=source_data["quality_score"],
                status=source_data["status"],
                last_update=source_data["last_update"]
            )
            water_data.add_source(source)
        
        return water_data 