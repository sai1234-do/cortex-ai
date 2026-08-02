from typing import Optional

from app.repositories.conversation_repository import ConversationRepository

repository = ConversationRepository()


async def create_conversation(
    project_id: Optional[int] = None
):
    return await repository.create_conversation(
        project_id
    )


async def get_conversations(
    project_id: int
):
    return await repository.get_conversations(
        project_id
    )


async def rename_conversation(
    conversation_id: int,
    title: str
):
    return await repository.rename_conversation(
        conversation_id,
        title
    )


async def delete_conversation(
    conversation_id: int
):
    return await repository.delete_conversation(
        conversation_id
    )