from pydantic import ValidationError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from config.pydantic_utils import validation_error_response

from ..models import RSVP
from ..schemas import RSVPCreateRequest, RSVPResponse


class RSVPCreateView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            payload = RSVPCreateRequest.model_validate(request.data)
        except ValidationError as exc:
            return validation_error_response(exc)

        rsvp = RSVP.objects.create(**payload.model_dump())
        response = RSVPResponse.model_validate(rsvp)
        return Response(response.model_dump(mode="json"), status=status.HTTP_201_CREATED)
