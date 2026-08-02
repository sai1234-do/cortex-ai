from typing import Optional

from sqlalchemy import select

from app.database.database import AsyncSessionLocal
from app.database.conversation import Conversation


class ConversationRepository:

    async def create_conversation(
        self,
        project_id: Optional[int] = None
    ):

        async with AsyncSessionLocal() as session:

            conversation = Conversation(
                project_id=project_id
            )

            session.add(conversation)

            await session.commit()

            await session.refresh(conversation)

            return conversation

    async def get_conversations(
        self,
        project_id: int
    ):

        async with AsyncSessionLocal() as session:

            result = await session.execute(

                select(Conversation).where(
                    Conversation.project_id == project_id
                )
                .order_by(Conversation.id.desc())
            )

            return result.scalars().all()

    async def get_conversation(
        self,
        conversation_id: int
    ):

        async with AsyncSessionLocal() as session:

            result = await session.execute(

                select(Conversation).where(
                    Conversation.id == conversation_id
                )
                 
            )

            return result.scalar_one_or_none()

    async def rename_conversation(
        self,
        conversation_id: int,
        title: str
    ):

        async with AsyncSessionLocal() as session:

            conversation = await session.get(
                Conversation,
                conversation_id
            )

            if conversation is None:
                return None

            conversation.title = title

            await session.commit()

            await session.refresh(conversation)

            return conversation

    async def delete_conversation(
        self,
        conversation_id: int
    ):

        async with AsyncSessionLocal() as session:

            conversation = await session.get(
                Conversation,
                conversation_id
            )

            if conversation is None:
                return False

            await session.delete(conversation)

            await session.commit()

            return True