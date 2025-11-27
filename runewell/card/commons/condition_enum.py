from enum import Enum


class ConditionEnum(Enum):
    EQUAL_TO = 'equal_to'
    LESS_THAN = 'less_than'
    GREATER_THAN = 'greater_than'
    LESS_THAN_OR_EQUAL_TO = 'less_than_or_equal_to'
    GREATHER_THAN_OR_EQUAL_TO = 'greather_than_or_equal_to'
    NOT_EQUAL_TO = 'not_equal_to'
