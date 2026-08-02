from fastapi import APIRouter

from app.models.conversation_models import (
    ConversationCreate,
    ConversationResponse,
)

from app.services.conversation_service import (
    create_conversation,
    get_conversations,
    rename_conversation,
    delete_conversation,
)

router = APIRouter()


@router.post(
    "/conversations",
    response_model=ConversationResponse
)
async def add_conversation(
    conversation: ConversationCreate
):
    return await create_conversation(
        conversation.project_id
    )


@router.get(
    "/projects/{project_id}/conversations",
    response_model=list[ConversationResponse]
)
async def read_conversations(
    project_id: int
):
    return await get_conversations(
        project_id
    )


@router.put(
    "/conversations/{conversation_id}"
)
async def update_conversation(
    conversation_id: int,
    title: str
):
    return await rename_conversation(
        conversation_id,
        title
    )


@router.delete(
    "/conversations/{conversation_id}"
)
async def remove_conversation(
    conversation_id: int
):
    deleted = await delete_conversation(
        conversation_id
    )

    return {
        "success": deleted
    }