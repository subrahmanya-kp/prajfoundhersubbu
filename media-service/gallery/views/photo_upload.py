from pydantic import ValidationError
from rest_framework import parsers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from config.pydantic_utils import validation_error_response
from storage.backends import get_storage_backend

from ..image_validation import InvalidImageError, verify_is_real_image
from ..models import Photo
from ..schemas import PhotoResponse, PhotoUploadMetadata


class PhotoUploadView(APIView):
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def post(self, request, *args, **kwargs):
        uploaded_file = request.data.get("file")
        if uploaded_file is None:
            return Response({"errors": [{"field": "file", "message": "This field is required."}]}, status=status.HTTP_400_BAD_REQUEST)

        try:
            metadata = PhotoUploadMetadata.model_validate(
                {
                    "content_type": uploaded_file.content_type,
                    "size": uploaded_file.size,
                    "uploader_name": request.data.get("uploader_name", ""),
                }
            )
        except ValidationError as exc:
            return validation_error_response(exc)

        try:
            verify_is_real_image(uploaded_file)
        except InvalidImageError as exc:
            return Response({"errors": [{"field": "file", "message": str(exc)}]}, status=status.HTTP_400_BAD_REQUEST)

        backend = get_storage_backend()
        result = backend.upload(
            uploaded_file,
            filename=uploaded_file.name,
            content_type=metadata.content_type,
        )

        photo = Photo.objects.create(
            image_url=result.url,
            external_id=result.external_id,
            storage_backend=result.backend,
            uploader_name=metadata.uploader_name,
        )

        response = PhotoResponse.model_validate(photo)
        return Response(response.model_dump(mode="json"), status=status.HTTP_201_CREATED)
