from pydantic import BaseModel
from datetime import datetime


class FileResponse(BaseModel):

    id: int

    filename: str

    filepath: str

    filetype: str

    filesize: int

    uploaded_at: datetime

    class Config:

        from_attributes = True