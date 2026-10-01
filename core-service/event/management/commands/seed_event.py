from django.core.management.base import BaseCommand

from event.models import Ceremony, EventDetail

VENUE_NAME = "Shree Radha Krishna Sabha Bhavana"
ADDRESS = "Centralised A/C Hall, Karkala"
LATITUDE = "13.2093306"
LONGITUDE = "74.9970934"
MAP_EMBED_URL = (
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4288.864242974652"
    "!2d74.99709341106067!3d13.20933058707465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768"
    "!4f13.1!3m3!1m2!1s0x3bbb5669cae04cff%3A0xc281070ebb558f76"
    "!2sShree%20Radha%20Krishna%20Sabha%20Bhavana%2C%20Centralised%20A%2FC%20hall%2C%20Karkala"
    "!5e1!3m2!1sen!2sin!4v1790701045851!5m2!1sen!2sin"
)
MAP_LINK = "https://maps.app.goo.gl/FZzM4KUUw8GbQuFK9"

CEREMONIES = [
    {
        "order": 0,
        "name": "Engagement",
        "start_time": "2026-10-12T10:15:00+05:30",
        "venue_name": VENUE_NAME,
        "address": ADDRESS,
        "description": "A small ceremony with family and close friends.",
    },
    {
        "order": 1,
        "name": "Wedding",
        "start_time": "2026-12-13T10:15:00+05:30",
        "venue_name": VENUE_NAME,
        "address": ADDRESS,
        "description": "The wedding ceremony, followed by lunch.",
    },
]


class Command(BaseCommand):
    help = "Seeds/updates the singleton EventDetail row and the Engagement/Wedding Ceremony rows."

    def handle(self, *args, **options):
        obj, created = EventDetail.objects.update_or_create(
            pk=1,
            defaults={
                "couple_names": "Prajna & Subrahmanya",
                "venue_name": VENUE_NAME,
                "address": ADDRESS,
                "latitude": LATITUDE,
                "longitude": LONGITUDE,
                "map_embed_url": MAP_EMBED_URL,
                "map_link": MAP_LINK,
            },
        )
        verb = "Created" if created else "Updated"
        self.stdout.write(self.style.SUCCESS(f"{verb} EventDetail: {obj.venue_name}"))

        for ceremony_data in CEREMONIES:
            order = ceremony_data["order"]
            ceremony, ceremony_created = Ceremony.objects.update_or_create(
                order=order,
                defaults=ceremony_data,
            )
            verb = "Created" if ceremony_created else "Updated"
            self.stdout.write(self.style.SUCCESS(f"{verb} Ceremony: {ceremony.name} ({ceremony.start_time})"))
