from app.services.retrieval_service import retrieve_context
from app.services.memory_service import get_memories


async def build_context(
    user_id: int,
    question: str,
    file_ids: list[int] | None = None
):

    # -------------------------
    # Memory
    # -------------------------

    memories = await get_memories(user_id)

    memory_text = "\n".join(
        [
            f"- {m.title}: {m.content}"
            for m in memories
        ]
    )

    # -------------------------
    # Documents
    # -------------------------

    document_text = await retrieve_context(
        user_id=user_id,
        question=question,
        file_ids=file_ids
    )

    return {
        "memory": memory_text,
        "documents": document_text
    }