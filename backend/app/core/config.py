import os
from pydantic_settings import BaseSettings, SettingsConfigDict

print("=" * 50)
print("ENVIRONMENT VARIABLES")
print("=" * 50)

for key, value in sorted(os.environ.items()):
    print(f"{key} = {value}")

print("=" * 50)


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