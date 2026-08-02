from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.security import decode_access_token
from app.repositories.user_repository import UserRepository

security = HTTPBearer()

repo = UserRepository()


async def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(security)

):

    token = credentials.credentials

    payload = decode_access_token(token)

    if payload is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    user = await repo.get_user_by_id(
        payload["user_id"]
    )

    if user is None:

        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user