import { useConversationStore } from "../store/conversationStore";

export function openOrCreateConversation(assistant = null) {

    const state = useConversationStore.getState();

    // If a conversation already exists, open the latest one
    if (state.conversations.length > 0) {

        const latestConversation = state.conversations[0];

        state.setActiveConversation(latestConversation.id);

        return latestConversation.id;
    }

    // Otherwise create a new conversation
    return state.createConversation(assistant);

}