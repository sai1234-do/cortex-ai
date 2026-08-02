from sqlalchemy import select

from app.database.database import AsyncSessionLocal
from app.database.user import User

from app.core.security import hash_password


async def reset_password(email: str, new_password: str):

    async with AsyncSessionLocal() as session:

        result = await session.execute(

            select(User).where(
                User.email == email
            )

        )

        user = result.scalar_one_or_none()

        if user is None:
            raise Exception("Email not found")

        user.password = hash_password(new_password)

        await session.commit()

        return {
            "message": "Password updated successfully"
        }