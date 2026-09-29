from django.urls import path

from .views import EventDetailView

urlpatterns = [
    path("", EventDetailView.as_view(), name="event-detail"),
]
