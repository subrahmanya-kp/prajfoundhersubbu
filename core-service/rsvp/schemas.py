from datetime import datetime

from pydantic import BaseModel, Field, field_validator


class RSVPCreateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    contact: str = Field(min_length=1, max_length=200)
    attending: bool
    guest_count: int = Field(default=1, ge=1, le=20)
    message: str = ""

    @field_validator("name", "contact")
    @classmethod
    def not_blank(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("must not be blank")
        return stripped


class RSVPResponse(BaseModel):
    id: int
    name: str
    contact: str
    attending: bool
    guest_count: int
    message: str
    created_at: datetime

    model_config = {"from_attributes": True}
