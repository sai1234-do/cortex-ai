import os

from app.repositories.file_repository import FileRepository

from app.utils.document_loader import extract_text
from app.utils.text_chunker import chunk_text

from app.vectorstore.embedding_service import create_embedding
from app.vectorstore.chroma_db import store_chunks

repository = FileRepository()


async def save_uploaded_file(

    user_id: int,

    file

):

    upload_dir = "app/uploads"

    os.makedirs(upload_dir, exist_ok=True)

    filepath = os.path.join(

        upload_dir,

        file.filename

    )

    contents = await file.read()

    with open(filepath, "wb") as f:
        f.write(contents)

    saved_file = await repository.save_file(

        user_id=user_id,

        filename=file.filename,

        filepath=filepath,

        filetype=file.content_type,

        filesize=len(contents)

    )

    text = extract_text(filepath)
   

    chunks = chunk_text(text)
    

    embeddings = [

        create_embedding(chunk)

        for chunk in chunks

    ]
   

    store_chunks(

     user_id=user_id,

     file_id=saved_file.id,

     filename=saved_file.filename,

     chunks=chunks,

     embeddings=embeddings

    )

    return saved_file