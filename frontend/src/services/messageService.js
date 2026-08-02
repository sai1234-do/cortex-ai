import api from "./api";

export async function getMessages(conversationId) {
    const response = await api.get(
        `/conversations/${conversationId}/messages`
    );

    return response.data;
}