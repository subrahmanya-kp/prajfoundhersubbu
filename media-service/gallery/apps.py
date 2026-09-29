from django.apps import AppConfig


class GalleryConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "gallery"

    def ready(self):
        from . import image_validation  # noqa: F401  (registers the HEIF opener on import)
