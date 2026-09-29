from datetime import datetime
from decimal import Decimal

from django.test import SimpleTestCase
from pydantic import ValidationError

from event.schemas import CeremonyResponse, EventDetailResponse


class FakeCeremony:
    id = 1
    name = "Wedding"
    start_time = datetime(2026, 12, 13, 10, 15)
    venue_name = "Grand Hall"
    address = "123 Street"
    description = "The main ceremony"
    order = 0


class CeremonyResponseTests(SimpleTestCase):
    def test_from_model_like_instance(self):
        resp = CeremonyResponse.model_validate(FakeCeremony())
        assert resp.name == "Wedding"
        assert resp.order == 0


class EventDetailResponseTests(SimpleTestCase):
    def test_serializes_with_nested_ceremonies(self):
        resp = EventDetailResponse(
            couple_names="Ananya & Rohan",
            venue_name="Grand Hall",
            address="123 Street, Bengaluru",
            latitude=Decimal("12.9716"),
            longitude=Decimal("77.5946"),
            map_embed_url="",
            map_link="",
            description="",
            ceremonies=[FakeCeremony()],
        )
        dumped = resp.model_dump(mode="json")
        assert dumped["couple_names"] == "Ananya & Rohan"
        assert dumped["latitude"] == "12.9716"
        assert len(dumped["ceremonies"]) == 1
        assert dumped["ceremonies"][0]["name"] == "Wedding"

    def test_allows_null_coordinates(self):
        resp = EventDetailResponse(
            couple_names="Ananya & Rohan",
            venue_name="",
            address="",
            latitude=None,
            longitude=None,
            map_embed_url="",
            map_link="",
            description="",
            ceremonies=[],
        )
        assert resp.latitude is None
        assert resp.ceremonies == []

    def test_rejects_missing_required_field(self):
        with self.assertRaises(ValidationError):
            EventDetailResponse(
                venue_name="",
                address="",
                latitude=None,
                longitude=None,
                map_embed_url="",
                map_link="",
                description="",
                ceremonies=[],
            )
