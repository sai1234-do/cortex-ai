from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from app.core.auth import get_current_user
from app.models.chat_models import ChatRequest
from app.services.chat_service import stream_chat

router = APIRouter()


@router.post("/chat/stream")
async def chat_stream(

    request: ChatRequest,

    current_user=Depends(get_current_user)

):

    async def event_generator():

        async for chunk in stream_chat(

            user_id=current_user.id,

            conversation_id=request.conversation_id,

            user_message=request.message,

            workspace=request.workspace,

            file_ids=request.file_ids

        ):

            yield chunk

    return StreamingResponse(

        event_generator(),

        media_type="text/plain"

    )