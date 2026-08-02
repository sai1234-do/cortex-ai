from sqlalchemy import select

from passlib.context import CryptContext

from app.database.database import AsyncSessionLocal
from app.database.user import User

from app.models.auth_models import (
    SignupRequest,
    LoginRequest,
    AuthResponse,
    UserResponse
)

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password
)

pwd = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


async def signup(data: SignupRequest):

    async with AsyncSessionLocal() as session:

        result = await session.execute(
            select(User).where(
                User.email == data.email
            )
        )

        existing = result.scalar_one_or_none()

        if existing:
            raise Exception("Email already exists")

        user = User(
            name=data.name,
            email=data.email,
            password=hash_password(data.password)
        )

        session.add(user)

        await session.commit()

        await session.refresh(user)

        token = create_access_token(user.id)

        return AuthResponse(
            access_token=token,
            user=UserResponse(
                id=user.id,
                name=user.name,
                email=user.email
            )
        )


async def login(data: LoginRequest):

    async with AsyncSessionLocal() as session:

        result = await session.execute(
            select(User).where(
                User.email == data.email
            )
        )

        user = result.scalar_one_or_none()

        if user is None:
            raise Exception("Invalid email or password")

        if not verify_password(
            data.password,
            user.password
        ):
            raise Exception("Invalid email or password")

        token = create_access_token(user.id)

        return AuthResponse(
            access_token=token,
            user=UserResponse(
                id=user.id,
                name=user.name,
                email=user.email
            )
        )