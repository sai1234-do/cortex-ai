export function generateConversationTitle(message) {

    const text = message.trim();

    const greetings = [

        "hi",
        "hello",
        "hey",
        "hii",
        "yo",
        "thanks",
        "thank you",
        "ok",
        "okay",
        "good morning",
        "good afternoon",
        "good evening"

    ];

    if (greetings.includes(text.toLowerCase())) {

        return "New Conversation";

    }

    if (text.length <= 40) {

        return text;

    }

    return text.substring(0, 40) + "...";

}