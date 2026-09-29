from django.db import models


class Ceremony(models.Model):
    """One function/ceremony in the wedding schedule, e.g. Haldi, Sangeet, Wedding."""

    name = models.CharField(max_length=150)
    start_time = models.DateTimeField()
    venue_name = models.CharField(max_length=255, blank=True)
    address = models.TextField(blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "start_time"]

    def __str__(self):
        return self.name
