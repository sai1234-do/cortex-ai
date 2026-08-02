from sqlalchemy import select

from app.database.database import AsyncSessionLocal
from app.database.tables import Memory


class MemoryRepository:

    async def create_memory(
        self,
        user_id: int,
        category: str,
        title: str,
        content: str,
        importance: int = 1
    ):

        async with AsyncSessionLocal() as session:

            memory = Memory(
                user_id=user_id,
                category=category,
                title=title,
                content=content,
                importance=importance
            )

            session.add(memory)

            await session.commit()

            await session.refresh(memory)

            return memory

    async def get_all_memories(
        self,
        user_id: int
    ):

        async with AsyncSessionLocal() as session:

            result = await session.execute(
                select(Memory).where(
                    Memory.user_id == user_id
                )
            )

            return result.scalars().all()

    async def get_memory_context(
        self,
        user_id: int
    ):

        async with AsyncSessionLocal() as session:

            result = await session.execute(
                select(Memory).where(
                    Memory.user_id == user_id
                )
            )

            return result.scalars().all()

    async def search_memories(
        self,
        user_id: int,
        query: str
    ):

        async with AsyncSessionLocal() as session:

            result = await session.execute(
                select(Memory).where(
                    Memory.user_id == user_id
                )
            )

            memories = result.scalars().all()

            query = query.lower()

            scored = []

            for memory in memories:

                score = 0

                text = f"{memory.title} {memory.content} {memory.category}".lower()

                for word in query.split():

                    if word in text:
                        score += 1

                if score > 0:
                    scored.append((score, memory))

            scored.sort(
                key=lambda x: x[0],
                reverse=True
            )

            return [memory for _, memory in scored[:5]]