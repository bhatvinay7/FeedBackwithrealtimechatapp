import redis
from app.core.config import settings
redisClient =redis.Redis.from_url(url=f"redis://{settings.Redis_URL}:{int(settings.port)}",password=settings.password, decode_responses=True)

def get_redis_client():
    return redisClient



