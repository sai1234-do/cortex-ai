from sqlalchemy.ext.asyncio import (
    create_async_engine,
    AsyncSession,
    async_sessionmaker
)

from sqlalchemy.orm import DeclarativeBase

import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite+aiosqlite:///./cortex.db"
)


class Base(DeclarativeBase):
    pass


engine = create_async_engine(

    DATABASE_URL,

    echo=True

)


AsyncSessionLocal = async_sessionmaker(

    bind=engine,

    class_=AsyncSession,

    expire_on_commit=False

)