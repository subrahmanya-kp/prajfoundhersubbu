from django.contrib import admin

from .models import Photo


@admin.action(description="Approve selected photos")
def approve_photos(modeladmin, request, queryset):
    queryset.update(status=Photo.STATUS_APPROVED)


@admin.action(description="Reject selected photos")
def reject_photos(modeladmin, request, queryset):
    queryset.update(status=Photo.STATUS_REJECTED)


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ["id", "uploader_name", "storage_backend", "status", "uploaded_at"]
    list_filter = ["status", "storage_backend"]
    search_fields = ["uploader_name"]
    actions = [approve_photos, reject_photos]
