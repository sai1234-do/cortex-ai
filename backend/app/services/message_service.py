from app.repositories.message_repository import MessageRepository

repository = MessageRepository()


async def create_message(
    conversation_id: int,
    role: str,
    content: str
):
    return await repository.create_message(
        conversation_id,
        role,
        content
    )


async def get_messages(
    conversation_id: int
):
    return await repository.get_messages(
        conversation_id
    )

async def get_recent_messages(
    conversation_id: int,
    limit: int = 15
):
    return await repository.get_recent_messages(
        conversation_id,
        limit
    )