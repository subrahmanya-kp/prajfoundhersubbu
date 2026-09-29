from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Ceremony, EventDetail
from ..schemas import EventDetailResponse


class EventDetailView(APIView):
    def get(self, request, *args, **kwargs):
        obj, _ = EventDetail.objects.get_or_create(pk=1)
        ceremonies = Ceremony.objects.all()

        response = EventDetailResponse(
            couple_names=obj.couple_names,
            venue_name=obj.venue_name,
            address=obj.address,
            latitude=obj.latitude,
            longitude=obj.longitude,
            map_embed_url=obj.map_embed_url,
            map_link=obj.map_link,
            description=obj.description,
            ceremonies=list(ceremonies),
        )
        return Response(response.model_dump(mode="json"))
