from datetime import datetime, timezone

from django.test import SimpleTestCase, override_settings
from pydantic import ValidationError

from gallery.schemas import PhotoResponse, PhotoUploadMetadata


class PhotoUploadMetadataTests(SimpleTestCase):
    def test_accepts_allowed_content_type_within_size(self):
        meta = PhotoUploadMetadata.model_validate(
            {"content_type": "image/jpeg", "size": 1024, "uploader_name": "Asha"}
        )
        assert meta.content_type == "image/jpeg"
        assert meta.uploader_name == "Asha"

    def test_defaults_uploader_name_to_empty(self):
        meta = PhotoUploadMetadata.model_validate({"content_type": "image/png", "size": 100})
        assert meta.uploader_name == ""

    def test_rejects_disallowed_content_type(self):
        with self.assertRaises(ValidationError):
            PhotoUploadMetadata.model_validate({"content_type": "application/pdf", "size": 100})

    def test_rejects_executable_content_type(self):
        with self.assertRaises(ValidationError):
            PhotoUploadMetadata.model_validate({"content_type": "application/x-msdownload", "size": 100})

    @override_settings(MAX_UPLOAD_SIZE_BYTES=1000)
    def test_rejects_oversized_file(self):
        with self.assertRaises(ValidationError):
            PhotoUploadMetadata.model_validate({"content_type": "image/jpeg", "size": 1001})

    def test_rejects_zero_size(self):
        with self.assertRaises(ValidationError):
            PhotoUploadMetadata.model_validate({"content_type": "image/jpeg", "size": 0})


class PhotoResponseTests(SimpleTestCase):
    def test_from_model_like_instance(self):
        class FakePhoto:
            id = 1
            image_url = "https://example.com/photo.jpg"
            uploader_name = "Asha"
            status = "approved"
            uploaded_at = datetime(2026, 1, 1, tzinfo=timezone.utc)

        resp = PhotoResponse.model_validate(FakePhoto())
        dumped = resp.model_dump(mode="json")
        assert dumped["status"] == "approved"
        assert dumped["image_url"] == "https://example.com/photo.jpg"

    def test_rejects_invalid_status_value(self):
        class FakePhoto:
            id = 1
            image_url = "https://example.com/photo.jpg"
            uploader_name = ""
            status = "not-a-real-status"
            uploaded_at = datetime(2026, 1, 1, tzinfo=timezone.utc)

        with self.assertRaises(ValidationError):
            PhotoResponse.model_validate(FakePhoto())
