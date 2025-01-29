from src.utils.storage import StorageClient
from src.utils.settings import settings
from src.dto.File import File as FileDTO

class FileStorageClient(StorageClient):
    async def upload_file(self, file: FileDTO, file_content: bytes):
        if len(file_content) == 0:
            return {"status": "error", "message": "File is empty"}
        async for client in self.get_client():
            await client.put_object(
                Bucket=self.bucket_name,
                Key=f'uploads/{file.user_id}/files/{file.id}_{file.name}',
                Body=file_content
            )

        return {"status": "ok"}
    
    async def download_file(self, file: FileDTO, user_id: str):
        async for client in self.get_client():
            response = await client.get_object(
                Bucket=self.bucket_name,
                Key=f'uploads/{user_id}/files/{file.id}_{file.name}'
            )
            file_content = await response['Body'].read()
            return file_content
        return {"status": "exeption"}

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