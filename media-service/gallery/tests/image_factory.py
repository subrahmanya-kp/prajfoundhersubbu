import io

from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image


def make_image_bytes(fmt: str, size=(10, 10), color="red") -> bytes:
    img = Image.new("RGB", size, color=color)
    buf = io.BytesIO()
    img.save(buf, format=fmt)
    return buf.getvalue()


def make_uploaded_file(fmt: str, content_type: str, name: str = "photo") -> SimpleUploadedFile:
    ext = fmt.lower()
    data = make_image_bytes(fmt)
    return SimpleUploadedFile(f"{name}.{ext}", data, content_type=content_type)
