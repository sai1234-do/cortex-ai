import os
from pydantic_settings import BaseSettings, SettingsConfigDict

print("===== ENVIRONMENT VARIABLES =====")
print(dict(os.environ))
print("=================================")

class Settings(BaseSettings):
    APP_NAME: str
    DEBUG: bool
    HOST: str
    PORT: int
    GROQ_API_KEY: str
    SECRET_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

settings = Settings()