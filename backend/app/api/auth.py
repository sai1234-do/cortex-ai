from fastapi import APIRouter, HTTPException

from app.models.auth_models import (
    SignupRequest,
    LoginRequest,
    AuthResponse
)

from app.services.auth_service import (
    signup,
    login
)
from app.core.security import verify_token

router = APIRouter()


@router.post(
    "/auth/register",
    response_model=AuthResponse
)
async def register_user(data: SignupRequest):

    try:

        return await signup(data)

    except Exception as e:

        raise HTTPException(

            status_code=400,

            detail="Internal server error"

        )


@router.post(
    "/auth/login",
    response_model=AuthResponse
)
async def login_user(data: LoginRequest):

    try:

        return await login(data)

    except Exception as e:

        raise HTTPException(

            status_code=401,

            detail=str(e)

        )