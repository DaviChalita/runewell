from typing import List

from pydantic import BaseModel

from ..commons.rarity import Rarity
from ..models.stats import Stats


class CardRequest(BaseModel):
    name: str
    effect: str
    type: str
    color: str
    cost: str
    stats: List[Stats]
    sets: List[str]
    rarity: List[Rarity]
