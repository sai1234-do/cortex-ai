from app.database.database import AsyncSessionLocal
from app.database.tables import File


class FileRepository:

    async def save_file(

        self,

        user_id: int,

        filename: str,

        filepath: str,

        filetype: str,

        filesize: int

    ):

        async with AsyncSessionLocal() as session:

            file = File(

                user_id=user_id,

                filename=filename,

                filepath=filepath,

                filetype=filetype,

                filesize=filesize

            )

            session.add(file)

            await session.commit()

            await session.refresh(file)

            return file