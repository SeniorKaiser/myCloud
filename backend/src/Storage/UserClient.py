from src.utils.storage import StorageClient
from src.utils.settings import settings

class UserStorageClient(StorageClient):
    async def create_user_disk(self, user_id: str):
        async for client in self.get_client():
            folders = [
                f"uploads/{user_id}/",
                f"uploads/{user_id}/files/",
                f"uploads/{user_id}/data/"
            ]
            for folder in folders:
                await client.put_object(
                    Bucket=self.bucket_name,
                    Key=folder,
                    Body=b""
                )
        return {"status": "ok"}
    
    async def delete_user_disk(self, user_id: str):
        async for client in self.get_client():
            await client.delete_object(
                Bucket=self.bucket_name,
                Key=f"uploads/{user_id}/"
            )
        return {"status": "ok"}
    

user_storage_client = UserStorageClient(
    access_key=settings.ACCESS_KEY_S3,
    secret_key=settings.SECRET_KEY_S3,
    endpoint_url="https://storage.yandexcloud.net",
    bucket_name="mycloud-backet"
)