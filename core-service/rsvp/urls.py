from django.urls import path

from .views import RSVPCreateView

urlpatterns = [
    path("", RSVPCreateView.as_view(), name="rsvp-create"),
]
