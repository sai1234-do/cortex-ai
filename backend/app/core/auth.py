from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.security import verify_token
from app.repositories.user_repository import UserRepository

bearer = HTTPBearer()

repo = UserRepository()


async def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(bearer)

):

    user_id = verify_token(
        credentials.credentials
    )

    if user_id is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    user = await repo.get_user_by_id(user_id)

    if user is None:

        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user