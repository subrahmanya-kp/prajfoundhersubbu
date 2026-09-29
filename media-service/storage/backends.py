import uuid
from abc import ABC, abstractmethod
from dataclasses import dataclass

from django.conf import settings


@dataclass
class UploadResult:
    url: str
    external_id: str
    backend: str


class BaseStorageBackend(ABC):
    name = "base"

    @abstractmethod
    def upload(self, file, filename: str, content_type: str) -> UploadResult:
        """Upload a file object and return an UploadResult with a public/shareable URL."""
        raise NotImplementedError

    def delete(self, external_id: str) -> None:
        """Optional: delete a previously uploaded file. No-op by default."""
        return None

    @staticmethod
    def unique_filename(filename: str) -> str:
        suffix = filename.rsplit(".", 1)[-1] if "." in filename else "jpg"
        return f"{uuid.uuid4().hex}.{suffix}"


class S3StorageBackend(BaseStorageBackend):
    name = "s3"

    def __init__(self):
        import boto3

        self.bucket = settings.AWS_STORAGE_BUCKET_NAME
        self.prefix = settings.AWS_S3_KEY_PREFIX
        self.region = settings.AWS_S3_REGION_NAME
        self.client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=self.region,
        )

    def upload(self, file, filename: str, content_type: str) -> UploadResult:
        key = f"{self.prefix}{self.unique_filename(filename)}"
        self.client.upload_fileobj(
            file,
            self.bucket,
            key,
            ExtraArgs={"ContentType": content_type, "ACL": "public-read"},
        )
        url = f"https://{self.bucket}.s3.{self.region}.amazonaws.com/{key}"
        return UploadResult(url=url, external_id=key, backend=self.name)

    def delete(self, external_id: str) -> None:
        self.client.delete_object(Bucket=self.bucket, Key=external_id)


class GoogleDriveStorageBackend(BaseStorageBackend):
    name = "gdrive"

    def __init__(self):
        import json

        from google.oauth2 import service_account
        from googleapiclient.discovery import build

        credentials_info = json.loads(settings.GOOGLE_SERVICE_ACCOUNT_JSON)
        credentials = service_account.Credentials.from_service_account_info(
            credentials_info,
            scopes=["https://www.googleapis.com/auth/drive"],
        )
        self.service = build("drive", "v3", credentials=credentials)
        self.folder_id = settings.GOOGLE_DRIVE_FOLDER_ID

    def upload(self, file, filename: str, content_type: str) -> UploadResult:
        from googleapiclient.http import MediaIoBaseUpload

        media = MediaIoBaseUpload(file, mimetype=content_type, resumable=False)
        metadata = {
            "name": self.unique_filename(filename),
            "parents": [self.folder_id] if self.folder_id else [],
        }
        created = self.service.files().create(
            body=metadata, media_body=media, fields="id, webViewLink, webContentLink"
        ).execute()

        file_id = created["id"]
        self.service.permissions().create(
            fileId=file_id, body={"role": "reader", "type": "anyone"}
        ).execute()

        url = created.get("webContentLink") or created.get("webViewLink")
        return UploadResult(url=url, external_id=file_id, backend=self.name)

    def delete(self, external_id: str) -> None:
        self.service.files().delete(fileId=external_id).execute()


def get_storage_backend() -> BaseStorageBackend:
    backend_name = settings.STORAGE_BACKEND
    if backend_name == "s3":
        return S3StorageBackend()
    if backend_name == "gdrive":
        return GoogleDriveStorageBackend()
    raise ValueError(f"Unknown STORAGE_BACKEND: {backend_name!r}. Use 's3' or 'gdrive'.")
