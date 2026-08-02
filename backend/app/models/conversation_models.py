from typing import Optional

from pydantic import BaseModel


class ConversationCreate(BaseModel):
    project_id: Optional[int] = None


class ConversationRename(BaseModel):
    title: str


class ConversationResponse(BaseModel):

    id: int
    project_id: Optional[int] = None
    title: str

    class Config:
        from_attributes = True