from django.contrib import admin

from .models import Ceremony, EventDetail


@admin.register(EventDetail)
class EventDetailAdmin(admin.ModelAdmin):
    list_display = ["couple_names", "venue_name", "updated_at"]


@admin.register(Ceremony)
class CeremonyAdmin(admin.ModelAdmin):
    list_display = ["name", "start_time", "venue_name", "order"]
    ordering = ["order", "start_time"]
