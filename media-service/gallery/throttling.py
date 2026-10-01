from rest_framework.throttling import AnonRateThrottle


class PhotoUploadRateThrottle(AnonRateThrottle):
    """Higher-than-default rate for photo uploads: guests commonly select and
    upload several photos in one sitting (one HTTP request per photo), which
    the global anon default (10/minute, shared with every other endpoint)
    exhausts almost immediately."""

    scope = "photo_upload"
