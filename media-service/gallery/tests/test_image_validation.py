from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import SimpleTestCase

from gallery.image_validation import InvalidImageError, verify_is_real_image

from .image_factory import make_image_bytes, make_uploaded_file


class VerifyIsRealImageTests(SimpleTestCase):
    def test_accepts_real_jpeg(self):
        file = make_uploaded_file("JPEG", "image/jpeg")
        verify_is_real_image(file)  # should not raise

    def test_accepts_real_png(self):
        file = make_uploaded_file("PNG", "image/png")
        verify_is_real_image(file)

    def test_accepts_real_webp(self):
        file = make_uploaded_file("WEBP", "image/webp")
        verify_is_real_image(file)

    def test_accepts_real_heif(self):
        file = make_uploaded_file("HEIF", "image/heic")
        verify_is_real_image(file)

    def test_rejects_non_image_bytes_labeled_as_image(self):
        # A plain text/script payload wearing an image/jpeg label — this is the
        # spoofing case: trusting the Content-Type header alone would accept it.
        malicious = SimpleUploadedFile(
            "not-a-photo.jpg",
            b"<script>alert('xss')</script>",
            content_type="image/jpeg",
        )
        with self.assertRaises(InvalidImageError):
            verify_is_real_image(malicious)

    def test_rejects_truncated_image_data(self):
        full_jpeg = make_image_bytes("JPEG")
        truncated = SimpleUploadedFile("broken.jpg", full_jpeg[: len(full_jpeg) // 2], content_type="image/jpeg")
        with self.assertRaises(InvalidImageError):
            verify_is_real_image(truncated)

    def test_rejects_empty_file(self):
        empty = SimpleUploadedFile("empty.jpg", b"", content_type="image/jpeg")
        with self.assertRaises(InvalidImageError):
            verify_is_real_image(empty)

    def test_leaves_file_pointer_at_start_after_success(self):
        file = make_uploaded_file("PNG", "image/png")
        verify_is_real_image(file)
        assert file.tell() == 0

    def test_leaves_file_pointer_at_start_after_failure(self):
        malicious = SimpleUploadedFile("bad.jpg", b"not an image", content_type="image/jpeg")
        with self.assertRaises(InvalidImageError):
            verify_is_real_image(malicious)
        assert malicious.tell() == 0
