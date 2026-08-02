from app.vectorstore.embedding_service import create_embedding
from app.vectorstore.chroma_db import search_chunks


async def retrieve_context(
    user_id: int,
    question: str,
    file_ids: list[int] | None = None
):

    embedding = create_embedding(question)

    chunks = search_chunks(
        user_id=user_id,
        embedding=embedding,
        file_ids=file_ids
    )

    if not chunks:
        return ""

    return "\n\n".join(chunks)