from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL:str
    GOOGLE_CLIENT_ID:str
    GOOGLE_CLIENT_SECRET:str
    secret_key:str
    Redis_URL:str
    password:str
    password:str
    port:str
    NEXT_PUBLIC_FRONTEND_API_URL:str
    class Config:
        env_file = ".env"

settings = Settings()
