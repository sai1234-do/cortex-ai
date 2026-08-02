from app.services.llm_service import generate_json
from app.utils.json_parser import parse_json

MEMORY_PROMPT = """
You are Cortex's memory engine.

Your task is to determine whether the user's message
contains long-term personal information worth remembering.

Examples of things to remember:

- Name
- Preferred programming language
- Favourite technology
- Career goals
- Skills
- Preferences
- Education
- Interests
- Long-term projects

Examples NOT to remember:

- Solve factorial
- Tell me a joke
- Explain DSA
- What is Python?
- Write Java code

Return ONLY valid JSON.

If memory should be saved:

{
  "should_save": true,
  "category": "...",
  "title": "...",
  "content": "...",
  "importance": 5
}

Otherwise:

{
  "should_save": false
}
"""


async def extract_memory(message: str):

    prompt = f"""
{MEMORY_PROMPT}

User Message:

{message}
"""

    response = await generate_json(prompt)

    return parse_json(response)