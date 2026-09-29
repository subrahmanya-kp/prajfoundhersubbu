from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from rsvp.models import RSVP


class RSVPCreateViewTests(APITestCase):
    def setUp(self):
        self.url = reverse("rsvp-create")

    def test_creates_rsvp_with_valid_payload(self):
        payload = {"name": "Asha", "contact": "9999999999", "attending": True, "guest_count": 2}
        response = self.client.post(self.url, payload, format="json")

        assert response.status_code == status.HTTP_201_CREATED
        assert RSVP.objects.count() == 1
        rsvp = RSVP.objects.first()
        assert rsvp.name == "Asha"
        assert rsvp.guest_count == 2
        assert response.data["id"] == rsvp.id

    def test_defaults_guest_count(self):
        payload = {"name": "Ravi", "contact": "ravi@example.com", "attending": False}
        response = self.client.post(self.url, payload, format="json")

        assert response.status_code == status.HTTP_201_CREATED
        assert RSVP.objects.get().guest_count == 1

    def test_rejects_blank_name(self):
        payload = {"name": "  ", "contact": "x", "attending": True}
        response = self.client.post(self.url, payload, format="json")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert RSVP.objects.count() == 0
        assert "errors" in response.data

    def test_rejects_guest_count_over_limit(self):
        payload = {"name": "A", "contact": "b", "attending": True, "guest_count": 99}
        response = self.client.post(self.url, payload, format="json")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert RSVP.objects.count() == 0

    def test_rejects_missing_required_fields(self):
        response = self.client.post(self.url, {}, format="json")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert RSVP.objects.count() == 0
