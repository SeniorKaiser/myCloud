from aiobotocore.session import get_session
from src.utils.settings import settings
from fastapi import File

class StorageClient:
    def __init__(
            self,
            access_key: str,
            secret_key: str,
            endpoint_url: str,
            bucket_name: str
    ):
        self.config = {
            "aws_access_key_id": access_key,
            "aws_secret_access_key": secret_key,
            "endpoint_url": endpoint_url
        }
        self.bucket_name = bucket_name
        self.session = get_session()

    async def get_client(self):
        async with self.session.create_client("s3", **self.config) as client:
            yield client


storage_client = StorageClient(
    access_key=settings.ACCESS_KEY_S3,
    secret_key=settings.SECRET_KEY_S3,
    endpoint_url="https://storage.yandexcloud.net",
    bucket_name="mycloud-backet"
    )

