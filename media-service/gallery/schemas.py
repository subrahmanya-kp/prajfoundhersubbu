from datetime import datetime
from typing import Literal

from django.conf import settings
from pydantic import BaseModel, Field, field_validator


class PhotoUploadMetadata(BaseModel):
    """Validates the metadata of an uploaded file. The file bytes themselves are
    handled separately (Pydantic doesn't model Django's UploadedFile)."""

    content_type: str
    size: int = Field(gt=0)
    uploader_name: str = ""

    @field_validator("content_type")
    @classmethod
    def allowed_content_type(cls, value: str) -> str:
        if value not in settings.ALLOWED_UPLOAD_CONTENT_TYPES:
            raise ValueError(f"Unsupported file type: {value}")
        return value

    @field_validator("size")
    @classmethod
    def within_size_limit(cls, value: int) -> int:
        if value > settings.MAX_UPLOAD_SIZE_BYTES:
            raise ValueError("File too large.")
        return value


class PhotoResponse(BaseModel):
    id: int
    image_url: str
    uploader_name: str
    status: Literal["pending", "approved", "rejected"]
    uploaded_at: datetime

    model_config = {"from_attributes": True}
