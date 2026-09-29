from datetime import datetime, timezone

from django.test import SimpleTestCase
from pydantic import ValidationError

from rsvp.schemas import RSVPCreateRequest, RSVPResponse


class RSVPCreateRequestTests(SimpleTestCase):
    def test_valid_payload(self):
        req = RSVPCreateRequest.model_validate(
            {"name": "Asha", "contact": "9999999999", "attending": True, "guest_count": 2}
        )
        assert req.name == "Asha"
        assert req.guest_count == 2
        assert req.message == ""

    def test_defaults_guest_count_to_one(self):
        req = RSVPCreateRequest.model_validate({"name": "Asha", "contact": "a@b.com", "attending": False})
        assert req.guest_count == 1

    def test_rejects_blank_name(self):
        with self.assertRaises(ValidationError):
            RSVPCreateRequest.model_validate({"name": "   ", "contact": "x", "attending": True})

    def test_rejects_blank_contact(self):
        with self.assertRaises(ValidationError):
            RSVPCreateRequest.model_validate({"name": "Asha", "contact": "  ", "attending": True})

    def test_strips_whitespace(self):
        req = RSVPCreateRequest.model_validate({"name": "  Asha  ", "contact": " a@b.com ", "attending": True})
        assert req.name == "Asha"
        assert req.contact == "a@b.com"

    def test_rejects_guest_count_over_limit(self):
        with self.assertRaises(ValidationError):
            RSVPCreateRequest.model_validate({"name": "A", "contact": "b", "attending": True, "guest_count": 21})

    def test_rejects_guest_count_under_one(self):
        with self.assertRaises(ValidationError):
            RSVPCreateRequest.model_validate({"name": "A", "contact": "b", "attending": True, "guest_count": 0})

    def test_rejects_missing_attending(self):
        with self.assertRaises(ValidationError):
            RSVPCreateRequest.model_validate({"name": "A", "contact": "b"})


class RSVPResponseTests(SimpleTestCase):
    def test_from_model_instance(self):
        class FakeRSVP:
            id = 1
            name = "Asha"
            contact = "a@b.com"
            attending = True
            guest_count = 2
            message = "Congrats!"
            created_at = datetime(2026, 1, 1, tzinfo=timezone.utc)

        resp = RSVPResponse.model_validate(FakeRSVP())
        dumped = resp.model_dump(mode="json")
        assert dumped["name"] == "Asha"
        assert dumped["guest_count"] == 2
        assert "created_at" in dumped
