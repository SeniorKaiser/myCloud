import json
import redis.asyncio as redis

class RedisClient:
    def __init__(self, host: str, port: int):
        self.client = redis.Redis(host=host, port=port, decode_responses=True)

    async def set(self, key: str, value: dict, ttl: int = 3600) -> None:
        await self.client.setex(key, ttl, json.dumps(value))
    
    async def get(self, key: str) -> dict:
        res = await self.client.get(key)
        return None if res is None else json.loads(res)
    
    async def delete(self, key: str) -> None:
        self.client.delete(key)

    async def close(self):
        await self.client.close()


redis_client = RedisClient(host="127.0.0.1", port=6379)