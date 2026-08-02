from sqlalchemy import (
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import Mapped, mapped_column

from datetime import datetime

from app.database.database import Base


class Memory(Base):

    __tablename__ = "memories"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
           Integer,
           default=1,
           index=True
    )

    category: Mapped[str] = mapped_column(
        String(50)
    )

    title: Mapped[str] = mapped_column(
        String(200)
    )

    content: Mapped[str] = mapped_column(
        String
    )

    importance: Mapped[int] = mapped_column(
        Integer,
        default=1
    )

    last_used: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

class File(Base):

    __tablename__ = "files"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        Integer,
        default=1,
        index=True
    )

    filename: Mapped[str] = mapped_column(
        String(255)
    )

    filepath: Mapped[str] = mapped_column(
        String(500)
    )

    filetype: Mapped[str] = mapped_column(
        String(50)
    )

    filesize: Mapped[int] = mapped_column(
        Integer
    )

    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )