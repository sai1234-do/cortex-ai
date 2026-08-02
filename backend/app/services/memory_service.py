from app.repositories.memory_repository import MemoryRepository

repository = MemoryRepository()


async def create_memory(user_id: int, memory):

    return await repository.create_memory(
        user_id=user_id,
        category=memory.category,
        title=memory.title,
        content=memory.content,
        importance=memory.importance
    )


async def get_memories(user_id: int):

    return await repository.get_all_memories(user_id)


async def get_memory_context(user_id: int, query: str):

    memories = await repository.search_memories(
        user_id=user_id,
        query=query
    )

    if not memories:
        return "No relevant memories."

    context = "Relevant User Memories:\n\n"

    for memory in memories:
        context += f"- {memory.title}: {memory.content}\n"

    return context