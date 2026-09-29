from django.db import models


class EventDetail(models.Model):
    """Singleton-style model: expect exactly one row, admin-editable."""

    couple_names = models.CharField(max_length=255, default="The Couple")
    venue_name = models.CharField(max_length=255, blank=True)
    address = models.TextField(blank=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    map_embed_url = models.URLField(blank=True, help_text="Google Maps embed iframe URL")
    map_link = models.URLField(blank=True, help_text="Shareable Google Maps link")
    description = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.couple_names
