from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class CeremonyResponse(BaseModel):
    id: int
    name: str
    start_time: datetime
    venue_name: str
    address: str
    description: str
    order: int

    model_config = {"from_attributes": True}


class EventDetailResponse(BaseModel):
    couple_names: str
    venue_name: str
    address: str
    latitude: Decimal | None
    longitude: Decimal | None
    map_embed_url: str
    map_link: str
    description: str
    ceremonies: list[CeremonyResponse]

    model_config = {"from_attributes": True}
