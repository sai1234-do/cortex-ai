from pydantic import BaseModel


class ChatRequest(BaseModel):

    conversation_id: int

    message: str

    workspace: str = "personal"

    file_ids: list[int] = []