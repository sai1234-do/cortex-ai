from fastapi import APIRouter, HTTPException

from app.models.password_models import (
    ForgotPasswordRequest,
    ResetPasswordRequest
)

from app.services.password_service import (
    reset_password
)

router = APIRouter()


@router.post("/forgot-password")
async def forgot_password(
    data: ForgotPasswordRequest
):

    return {
        "message":
        "Reset request accepted."
    }


@router.post("/reset-password")
async def reset_password_route(
    data: ResetPasswordRequest
):

    try:

        return await reset_password(

            data.email,

            data.new_password

        )

    except Exception as e:

        raise HTTPException(

            status_code=400,

            detail=str(e)

        )