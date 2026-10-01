from unittest.mock import patch

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from gallery.models import Photo
from storage.backends import UploadResult

from .image_factory import make_uploaded_file


class FakeStorageBackend:
    name = "fake"

    def upload(self, file, filename, content_type):
        return UploadResult(url=f"https://fake-storage.test/{filename}", external_id=filename, backend=self.name)


class PhotoUploadViewTests(APITestCase):
    def setUp(self):
        self.url = reverse("photo-upload")

    @patch("gallery.views.photo_upload.get_storage_backend", return_value=FakeStorageBackend())
    def test_uploads_valid_image(self, mock_backend):
        file = make_uploaded_file("JPEG", "image/jpeg")
        response = self.client.post(self.url, {"file": file, "uploader_name": "Asha"}, format="multipart")

        assert response.status_code == status.HTTP_201_CREATED
        assert Photo.objects.count() == 1
        photo = Photo.objects.get()
        assert photo.status == Photo.STATUS_PENDING
        assert photo.uploader_name == "Asha"
        assert photo.storage_backend == "fake"

    @patch("gallery.views.photo_upload.get_storage_backend", return_value=FakeStorageBackend())
    def test_uploaded_photo_defaults_to_pending_not_visible_in_list(self, mock_backend):
        file = make_uploaded_file("PNG", "image/png")
        self.client.post(self.url, {"file": file}, format="multipart")

        list_response = self.client.get(reverse("photo-list"))
        assert list_response.data == []

    def test_rejects_missing_file(self):
        response = self.client.post(self.url, {}, format="multipart")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert Photo.objects.count() == 0

    def test_rejects_disallowed_content_type(self):
        file = make_uploaded_file("JPEG", "application/pdf", name="fake")
        response = self.client.post(self.url, {"file": file}, format="multipart")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert Photo.objects.count() == 0

    def test_rejects_spoofed_non_image_file(self):
        from django.core.files.uploadedfile import SimpleUploadedFile

        malicious = SimpleUploadedFile(
            "not-a-photo.jpg", b"<script>alert('xss')</script>", content_type="image/jpeg"
        )
        response = self.client.post(self.url, {"file": malicious}, format="multipart")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert Photo.objects.count() == 0

    @patch("gallery.views.photo_upload.get_storage_backend", return_value=FakeStorageBackend())
    def test_does_not_call_storage_backend_for_invalid_image(self, mock_backend):
        from django.core.files.uploadedfile import SimpleUploadedFile

        malicious = SimpleUploadedFile("bad.jpg", b"not an image", content_type="image/jpeg")
        self.client.post(self.url, {"file": malicious}, format="multipart")

        mock_backend.assert_not_called()

    @patch("gallery.views.photo_upload.get_storage_backend", return_value=FakeStorageBackend())
    def test_uploading_more_than_ten_photos_in_a_row_is_not_throttled(self, mock_backend):
        # The upload endpoint has its own throttle scope (60/minute), separate
        # from the global anon default (10/minute) shared by every other
        # endpoint — guests uploading a batch of photos from one page visit
        # must not hit the same limit that protects e.g. the gallery list.
        for i in range(11):
            file = make_uploaded_file("JPEG", "image/jpeg", name=f"photo{i}")
            response = self.client.post(self.url, {"file": file}, format="multipart")
            assert response.status_code == status.HTTP_201_CREATED, response.data

        assert Photo.objects.count() == 11


class PhotoListViewTests(APITestCase):
    def setUp(self):
        self.url = reverse("photo-list")

    def test_returns_only_approved_photos(self):
        Photo.objects.create(
            image_url="https://example.com/a.jpg",
            external_id="a",
            storage_backend="fake",
            status=Photo.STATUS_APPROVED,
        )
        Photo.objects.create(
            image_url="https://example.com/b.jpg",
            external_id="b",
            storage_backend="fake",
            status=Photo.STATUS_PENDING,
        )
        Photo.objects.create(
            image_url="https://example.com/c.jpg",
            external_id="c",
            storage_backend="fake",
            status=Photo.STATUS_REJECTED,
        )

        response = self.client.get(self.url)

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["image_url"] == "https://example.com/a.jpg"

    def test_empty_when_no_approved_photos(self):
        response = self.client.get(self.url)
        assert response.data == []
