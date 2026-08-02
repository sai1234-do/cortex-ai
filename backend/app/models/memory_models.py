from pydantic import BaseModel


class MemoryCreate(BaseModel):

    category: str

    title: str

    content: str

    importance: int = 1


class MemoryResponse(BaseModel):

    id: int

    category: str

    title: str

    content: str

    importance: int

    class Config:

        from_attributes = True

class MemoryExtraction(BaseModel):

    should_save: bool

    category: str | None = None

    title: str | None = None

    content: str | None = None

    importance: int = 1