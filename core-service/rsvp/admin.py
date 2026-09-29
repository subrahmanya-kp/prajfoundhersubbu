from django.contrib import admin

from .models import RSVP


@admin.register(RSVP)
class RSVPAdmin(admin.ModelAdmin):
    list_display = ["name", "contact", "attending", "guest_count", "created_at"]
    list_filter = ["attending"]
    search_fields = ["name", "contact"]
    readonly_fields = ["created_at"]
