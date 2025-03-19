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

    async def delete_file(self, file_name: str, user_id: str):
        async for client in self.get_client():
            await client.delete_object(
                Bucket=self.bucket_name,
                Key=f"uploads/{user_id}/files/{file_name}"
            )
        return {"status": "ok"}
    
    async def rename_file(self, old_name: str, new_name: str, user_id: str):
        async for client in self.get_client():
            source_key = f"uploads/{user_id}/files/{old_name}"
            destination_key = f"uploads/{user_id}/files/{new_name}"

            await client.copy_object(
                Bucket=self.bucket_name,
                CopySource=f"{self.bucket_name}/{source_key}",
                Key=destination_key
            )
            await client.delete_object(
                Bucket=self.bucket_name,
                Key=source_key
            )
        return {"status": "ok"}
    
    async def get_presigned_url(self, user_id: str, name: str, expiration: int = 3600):
        async for client in self.get_client():
            url = await client.generate_presigned_url(
                "get_object",
                Params={
                    "Bucket": self.bucket_name,
                    "Key": f"uploads/{user_id}/files/{name}"
                },
                ExpiresIn=expiration,
            )
        
        return url


file_storage_client = FileStorageClient(
    access_key=settings.ACCESS_KEY_S3,
    secret_key=settings.SECRET_KEY_S3,
    endpoint_url="https://storage.yandexcloud.net",
    bucket_name="mycloud-backet"
)