from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from app.models.file_models import FileResponse
from app.services.file_service import save_uploaded_file
from app.core.auth import get_current_user

router = APIRouter()


@router.post(
    "/upload",
    response_model=FileResponse
)
async def upload_file(

    file: UploadFile = File(...),

    current_user=Depends(get_current_user)

):

    return await save_uploaded_file(

        current_user.id,

        file

    )