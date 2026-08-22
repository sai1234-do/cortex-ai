import json

from groq import AsyncGroq
from app.prompts.system_prompts import SYSTEM_PROMPTS

from app.core.config import settings

client = AsyncGroq(
    api_key=settings.GROQ_API_KEY
)
MODEL = "openai/gpt-oss-120b"


async def generate_stream(
    prompt: str,
    workspace: str = "personal",
    memory: str = "",
    documents: str = "",
    history: str = "",
):
    system_prompt = SYSTEM_PROMPTS.get(
       workspace,
       SYSTEM_PROMPTS["personal"]
    )
    final_prompt = f"""
     {system_prompt}

    ========================
     Conversation History
    ========================

     {history}

    ========================
     Long Term Memory
    ========================

    {memory}

    ========================
    Uploaded Documents
    ========================

     {documents}

    ========================
    Current User Message
    ========================

      {prompt}
                   """

    stream = await client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": final_prompt
            }
        ],
        stream=True,
    )

    async for chunk in stream:

        if (
            chunk.choices
            and chunk.choices[0].delta.content
        ):

            yield chunk.choices[0].delta.content


async def generate_json(prompt: str):

    response = await client.chat.completions.create(

        model=MODEL,

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        response_format={
            "type": "json_object"
        }

    )

    return json.loads(
        response.choices[0].message.content
    )