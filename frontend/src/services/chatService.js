import api from "./api";
import { useUIStore } from "../store/uiStore";

export async function streamChat(
    conversationId,
    message,
    fileIds,
    onChunk
) {
    const token = localStorage.getItem("token");

    const selectedAssistant =
        useUIStore.getState().selectedAssistant;

    const workspace =
        selectedAssistant?.id || "personal";

    const API_URL =
        import.meta.env.VITE_API_URL ||
        "http://127.0.0.1:8000/api/v1";

    const response = await fetch(
        `${API_URL}/chat/stream`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
                conversation_id: Number(conversationId),
                message,
                workspace,
                file_ids: fileIds,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to stream response");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        onChunk(decoder.decode(value));
    }
}