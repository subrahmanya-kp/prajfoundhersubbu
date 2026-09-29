from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def healthz(request):
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("healthz/", healthz),
    path("api/v1/rsvp/", include("rsvp.urls")),
    path("api/v1/event/", include("event.urls")),
]
