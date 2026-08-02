from pydantic import BaseModel


class ProjectCreate(BaseModel):

    name: str


class ProjectResponse(BaseModel):

    id: int

    user_id: int

    name: str

    

    class Config:

        from_attributes = True