from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Photo
from ..schemas import PhotoResponse


class PhotoListView(APIView):
    def get(self, request, *args, **kwargs):
        photos = Photo.objects.filter(status=Photo.STATUS_APPROVED)
        data = [PhotoResponse.model_validate(p).model_dump(mode="json") for p in photos]
        return Response(data)
