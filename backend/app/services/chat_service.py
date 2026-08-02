import asyncio

from app.services.llm_service import generate_stream
from app.services.memory_extractor import extract_memory
from app.services.memory_service import create_memory
from app.models.memory_models import MemoryCreate

from app.services.retrieval_service import retrieve_context
from app.services.context_builder import build_context
from app.services.message_service import (
    create_message,
    get_recent_messages
)

from app.repositories.conversation_repository import ConversationRepository

conversation_repo = ConversationRepository()


async def save_memory_in_background(user_id: int, user_message: str):

    try:

        memory = await extract_memory(user_message)

        if memory.get("should_save"):

            await create_memory(

                user_id,

                MemoryCreate(

                    category=memory["category"],
                    title=memory["title"],
                    content=memory["content"],
                    importance=memory.get("importance", 1)

                )

            )

    except Exception as e:

        print("Memory extraction skipped:", e)


async def stream_chat(

    user_id: int,
    conversation_id: int,
    user_message: str,
    workspace: str,
    file_ids: list[int]

):

    asyncio.create_task(

        save_memory_in_background(

            user_id,
            user_message

        )

    )

    # -----------------------------
    # Save User Message
    # -----------------------------

    content = user_message

    if file_ids:

      files_text = "\n".join(
        [f"📄 File ID: {fid}" for fid in file_ids]
       )

      content = f"{files_text}\n\n{user_message}"

    await create_message(
      conversation_id,
      "user",
      content
    )

    # -----------------------------
    # Auto Rename Conversation
    # -----------------------------

    try:

        conversation = await conversation_repo.get_conversation(

            conversation_id

        )

        if conversation:

            if (

                conversation.title is None

                or conversation.title.strip() == ""

                or conversation.title == "New Conversation"

            ):

                await conversation_repo.rename_conversation(

                    conversation.id,

                    user_message[:35]

                )

    except Exception as e:

        print("Rename Error:", e)

    # -----------------------------
    # Build User Context
    # -----------------------------

    context = await build_context(
       user_id=user_id,
       question=user_message,
       file_ids=file_ids
    )

    assistant_response = ""

    # -----------------------------
    # Conversation History
    # -----------------------------

    history = await get_recent_messages(
        conversation_id,
        15
    )

    history_text = ""

    for msg in history:

        history_text += (

            f"{msg.role.capitalize()}: "

            f"{msg.content}\n"

        )
    # -----------------------------
    # Stream LLM
    # -----------------------------

    async for chunk in generate_stream(

        user_message,

        workspace,

        memory=context["memory"],

        documents=context["documents"],

        history=history_text

    ):

        assistant_response += chunk

        yield chunk

        await asyncio.sleep(0.01)

    # -----------------------------
    # Save Assistant Message
    # -----------------------------

    await create_message(

        conversation_id,

        "assistant",

        assistant_response

    )