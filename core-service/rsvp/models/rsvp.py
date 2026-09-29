from django.db import models


class RSVP(models.Model):
    name = models.CharField(max_length=200)
    contact = models.CharField(max_length=200, help_text="Phone number or email")
    attending = models.BooleanField()
    guest_count = models.PositiveSmallIntegerField(default=1)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({'attending' if self.attending else 'not attending'})"
