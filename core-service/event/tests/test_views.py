from datetime import datetime, timezone

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from event.models import Ceremony, EventDetail


class EventDetailViewTests(APITestCase):
    def setUp(self):
        self.url = reverse("event-detail")

    def test_creates_singleton_on_first_request(self):
        assert EventDetail.objects.count() == 0

        response = self.client.get(self.url)

        assert response.status_code == status.HTTP_200_OK
        assert EventDetail.objects.count() == 1
        assert response.data["couple_names"] == "The Couple"
        assert response.data["ceremonies"] == []

    def test_reuses_existing_singleton(self):
        EventDetail.objects.create(pk=1, couple_names="Ananya & Rohan", venue_name="Grand Hall")

        response = self.client.get(self.url)

        assert response.status_code == status.HTTP_200_OK
        assert response.data["couple_names"] == "Ananya & Rohan"
        assert EventDetail.objects.count() == 1

    def test_includes_ceremonies(self):
        EventDetail.objects.create(pk=1, couple_names="Ananya & Rohan")
        Ceremony.objects.create(
            name="Engagement",
            start_time=datetime(2026, 12, 12, 10, 15, tzinfo=timezone.utc),
            venue_name="Garden Hall",
            order=0,
        )
        Ceremony.objects.create(
            name="Wedding",
            start_time=datetime(2026, 12, 13, 10, 15, tzinfo=timezone.utc),
            venue_name="Grand Hall",
            order=1,
        )

        response = self.client.get(self.url)

        assert response.status_code == status.HTTP_200_OK
        names = [c["name"] for c in response.data["ceremonies"]]
        assert names == ["Engagement", "Wedding"]
