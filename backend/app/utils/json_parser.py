import json


def parse_json(text: str):

    try:

        text = text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "")

        if text.startswith("```"):
            text = text.replace("```", "")

        if text.endswith("```"):
            text = text[:-3]

        return json.loads(text)

    except Exception:

        return {
            "should_save": False
        }