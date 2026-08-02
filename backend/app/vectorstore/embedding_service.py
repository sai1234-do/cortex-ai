try:
    from sentence_transformers import SentenceTransformer

    model = SentenceTransformer("all-MiniLM-L6-v2")

    def create_embedding(text: str):
        return model.encode(text).tolist()

except Exception as e:
    print("Embedding model not loaded:", e)

    def create_embedding(text: str):
        # Temporary fallback
        return [0.0] * 384