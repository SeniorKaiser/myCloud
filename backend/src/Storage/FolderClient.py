from src.utils.storage import StorageClient
from src.utils.settings import settings

class FolderStorageClient(StorageClient):
    async def create_folder(self, user_id: str, path: str):
        async for client in self.get_client():
            await client.put_object(
                Bucket=self.bucket_name,
                Key=f"uploads/{user_id}/files/{path}/",
                Body=b""
            )
        return {"status": "ok"}
    
    async def delete_folder(self, user_id: str, path: str):
        async for client in self.get_client():
            response = await client.list_objects_v2(
                Bucket=self.bucket_name,
                Prefix=f"uploads/{user_id}/files/{path}/"
            )
            objects = response.get("Contents", [])
            if not objects:
                return {"status": "ok"}
            delete_keys = [{"Key": obj["Key"]} for obj in objects]
            await client.delete_objects(
                Bucket=self.bucket_name,
                Delete={"Objects": delete_keys}
            )
        return {"status": "ok"}
    
    async def move_folder(self, user_id: str, old_path: str, new_path: str):
        old_folder_prefix = f"uploads/{user_id}/files/{old_path}/"
        new_folder_prefix = f"uploads/{user_id}/files/{new_path}/"
        async for client in self.get_client():
            response = await client.list_objects_v2(Bucket=self.bucket_name, Prefix=old_folder_prefix)
            objects = response.get("Contents", [])
            if not objects:
                return {"status": "ok"}
            for obj in objects:
                old_key = obj["Key"]
                new_key = old_key.replace(old_folder_prefix, new_folder_prefix, 1)
                await client.copy_object(
                    Bucket=self.bucket_name,
                    CopySource=f"{self.bucket_name}/{old_key}",
                    Key=new_key
                )
            delete_keys = [{"Key": obj["Key"]} for obj in objects]
            await client.delete_objects(
                Bucket=self.bucket_name,
                Delete={"Objects": delete_keys}
            )
        return {"status": "ok"}
    
    async def rename_folder(self, old_name: str, new_name: str):
        async for client in self.get_client():
            res = await client.list_objects_v2(Bucket=self.bucket_name, Prefix=f"{old_name}/")
            objects_to_move = res["Contents"]
            for obj in objects_to_move:
                old_key = obj["Key"]
                new_key = old_key.replace(old_name, new_name, 1)
                await client.copy_object(
                    Bucket=self.bucket_name,
                    CopySource=f"{self.bucket_name}/{old_key}",
                    Key=new_key
                )
                await client.delete_object(Bucket=self.bucket_name, Key=old_key)
        return f"Folder {old_name} renamed to {new_name} in {self.bucket_name}"


folder_client_storage = FolderStorageClient(
    access_key=settings.ACCESS_KEY_S3,
    secret_key=settings.SECRET_KEY_S3,
    endpoint_url="https://storage.yandexcloud.net",
    bucket_name="mycloud-backet"
)