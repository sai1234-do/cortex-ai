from sqlalchemy import select

from app.database.database import AsyncSessionLocal
from app.database.user import User


class UserRepository:

    async def create_user(
        self,
        name: str,
        email: str,
        password: str
    ):

        async with AsyncSessionLocal() as session:

            user = User(
                name=name,
                email=email,
                password=password
            )

            session.add(user)

            await session.commit()

            await session.refresh(user)

            return user

    async def get_user_by_email(
        self,
        email: str
    ):

        async with AsyncSessionLocal() as session:

            result = await session.execute(

                select(User).where(
                    User.email == email
                )

            )

            return result.scalar_one_or_none()

    async def get_user_by_id(
        self,
        user_id: int
    ):

        async with AsyncSessionLocal() as session:

            return await session.get(
                User,
                user_id
            )

    async def email_exists(
        self,
        email: str
    ):

        user = await self.get_user_by_email(email)

        return user is not None