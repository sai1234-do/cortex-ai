from app.database.database import engine, Base

import app.database.tables
import app.database.project
import app.database.conversation
import app.database.message 
import app.database.user


async def init_db():

    async with engine.begin() as conn:

        await conn.run_sync(
            Base.metadata.create_all
        )