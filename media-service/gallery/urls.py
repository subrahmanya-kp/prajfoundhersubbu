from django.urls import path

from .views import PhotoListView, PhotoUploadView

urlpatterns = [
    path("", PhotoListView.as_view(), name="photo-list"),
    path("upload/", PhotoUploadView.as_view(), name="photo-upload"),
]
