MAX_HISTORY = 10


def build_conversation_context(messages):

    if not messages:
        return ""

    recent = messages[-MAX_HISTORY:]

    conversation = []

    for message in recent:

        role = message["role"].upper()

        conversation.append(

            f"{role}: {message['content']}"

        )

    return "\n".join(conversation)