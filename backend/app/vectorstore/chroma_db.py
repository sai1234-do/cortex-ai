import faiss
import numpy as np

index = faiss.IndexFlatL2(384)

documents = []
metadatas = []


def store_chunks(
    user_id: int,
    file_id: int,
    filename: str,
    chunks: list,
    embeddings: list
):

    global documents, metadatas

    vectors = np.array(embeddings).astype("float32")

    index.add(vectors)

    for chunk in chunks:

        documents.append(chunk)

    for _ in chunks:

        metadatas.append(
            {
                "user_id": user_id,
                "file_id": file_id,
                "filename": filename,
                "workspace": "personal"
            }
        )


def search_chunks(
    user_id: int,
    embedding,
    file_ids=None,
    top_k=5
):

    if index.ntotal == 0:
        return []

    query = np.array([embedding]).astype("float32")

    distances, indices = index.search(query, top_k)

    results = []

    for idx in indices[0]:

        if idx == -1:
            continue

        meta = metadatas[idx]

        if meta["user_id"] != user_id:
            continue

        if file_ids and meta["file_id"] not in file_ids:
            continue

        results.append(documents[idx])

    return results