from pydantic import BaseModel

from ..commons import status_enum, condition_enum


class Stats(BaseModel):
    type: status_enum.StatusEnum
    condition: condition_enum.ConditionEnum
    value: int