from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Cortex AI"
    DEBUG: bool = False
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    GROQ_API_KEY: str = ""
    SECRET_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()