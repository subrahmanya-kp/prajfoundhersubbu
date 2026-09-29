from pydantic import ValidationError
from rest_framework.response import Response
from rest_framework import status


def validation_error_response(exc: ValidationError) -> Response:
    errors = [
        {"field": ".".join(str(p) for p in err["loc"]), "message": err["msg"]}
        for err in exc.errors()
    ]
    return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)
