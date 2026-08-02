from fastapi import APIRouter

from app.models.message_models import (
    MessageCreate,
    MessageResponse
)

from app.services.message_service import (
    create_message,
    get_messages
)

router = APIRouter()


@router.post(
    "/messages",
    response_model=MessageResponse
)
async def add_message(
    message: MessageCreate
):
    return await create_message(
        message.conversation_id,
        message.role,
        message.content
    )


@router.get(
    "/conversations/{conversation_id}/messages",
    response_model=list[MessageResponse]
)
async def read_messages(
    conversation_id: int
):
    return await get_messages(
        conversation_id
    )