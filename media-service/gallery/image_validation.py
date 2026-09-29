import pillow_heif
from django.core.files.uploadedfile import UploadedFile
from PIL import Image, UnidentifiedImageError

pillow_heif.register_heif_opener()

# Pillow format names for the mimetypes we accept (settings.ALLOWED_UPLOAD_CONTENT_TYPES).
# Pillow (with pillow-heif registered) reports both HEIC- and HEIF-brand files as "HEIF" —
# there is no separate "HEIC" format string, despite the distinct mimetype we accept.
ALLOWED_PILLOW_FORMATS = {"JPEG", "PNG", "WEBP", "HEIF"}


class InvalidImageError(ValueError):
    pass


def verify_is_real_image(uploaded_file: UploadedFile) -> None:
    """Sniff the actual file bytes to confirm this is a genuine, decodable image
    of an allowed format. The client-supplied content_type / filename extension
    are just labels and can be spoofed, so they're not trusted on their own —
    this opens and decodes the real pixel data.
    """
    uploaded_file.seek(0)
    try:
        with Image.open(uploaded_file) as img:
            img.verify()
    except (UnidentifiedImageError, OSError, ValueError) as exc:
        raise InvalidImageError("File is not a valid image.") from exc
    finally:
        uploaded_file.seek(0)

    # Image.verify() closes the file handle internally, so re-open to check format
    # and confirm a second full decode succeeds (verify() alone can miss some
    # truncated/corrupt payloads since it doesn't fully decode pixel data).
    uploaded_file.seek(0)
    try:
        with Image.open(uploaded_file) as img:
            if img.format not in ALLOWED_PILLOW_FORMATS:
                raise InvalidImageError(f"Unsupported image format: {img.format}")
            img.load()
    except (UnidentifiedImageError, OSError, ValueError) as exc:
        raise InvalidImageError("File is not a valid image.") from exc
    finally:
        uploaded_file.seek(0)
