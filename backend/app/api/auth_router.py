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

router = APIRouter()


@router.post(
    "/signup",
    response_model=AuthResponse
)
async def signup_route(data: SignupRequest):

    try:
        return await signup(data)

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post(
    "/login",
    response_model=AuthResponse
)
async def login_route(data: LoginRequest):

    try:
        return await login(data)

    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail="Internal server error"
        )