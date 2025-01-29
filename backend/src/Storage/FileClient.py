from src.utils.storage import StorageClient
from src.utils.settings import settings
from fastapi import UploadFile

class FileStorageClient(StorageClient):
    async def upload_file(self, file: UploadFile, id: str, user_id: str):
        object_name = file.filename
        async for client in self.get_client():
            file_content = await file.read()
            await client.put_object(
                Bucket=self.bucket_name,
                Key=f'{id}_{object_name}',
                Body=file_content
            )
        return {"status": "ok"}
    
    async def delete_file(self, file_name: str):
        async for client in self.get_client():
            await client.delete_object(
                Bucket=self.bucket_name,
                Key=file_name
            )
        return {"status": "ok"}
    
    async def rename_file(self, old_name: str, new_name: str):
        async for client in self.get_client():
            await client.copy_object(
                Bucket=self.bucket_name,
                CopySource=f"{self.bucket_name}/{old_name}",
                Key=new_name
            )
            await client.delete_object(
                Bucket=self.bucket_name,
                Key=old_name
            )
        return {"status": "ok"}


file_storage_client = FileStorageClient(
    access_key=settings.ACCESS_KEY_S3,
    secret_key=settings.SECRET_KEY_S3,
    endpoint_url="https://storage.yandexcloud.net",
    bucket_name="mycloud-backet"
)