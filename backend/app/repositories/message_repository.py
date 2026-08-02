from sqlalchemy import select

from app.database.database import AsyncSessionLocal
from app.database.message import Message


class MessageRepository:

    async def create_message(
        self,
        conversation_id: int,
        role: str,
        content: str
    ):

        async with AsyncSessionLocal() as session:

            message = Message(
                conversation_id=conversation_id,
                role=role,
                content=content
            )

            session.add(message)

            await session.commit()

            await session.refresh(message)

            return message

    async def get_messages(
        self,
        conversation_id: int
    ):

        async with AsyncSessionLocal() as session:

            result = await session.execute(

                select(Message).where(
                    Message.conversation_id == conversation_id
                )

            )

            return result.scalars().all()

    async def get_recent_messages(
        self,
        conversation_id: int,
        limit: int = 15
    ):

        async with AsyncSessionLocal() as session:

            result = await session.execute(

                select(Message)
                .where(
                    Message.conversation_id == conversation_id
                )
                .order_by(Message.created_at.desc())
                .limit(limit)

            )

            messages = result.scalars().all()

            messages.reverse()

            return messages