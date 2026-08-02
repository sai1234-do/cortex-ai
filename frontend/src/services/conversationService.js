import api from "./api";

export async function getConversations(projectId) {
    const response = await api.get(`/projects/${projectId}/conversations`);
    return response.data;
}

export async function createConversation(projectId = null) {

    const body = {};

    if (projectId !== null) {
        body.project_id = Number(projectId);
    }

    const response = await api.post("/conversations", body);

    return response.data;
}

export async function renameConversation(id, title) {

    const response = await api.put(
        `/conversations/${id}?title=${encodeURIComponent(title)}`
    );

    return response.data;
}

export async function deleteConversation(id) {

    await api.delete(`/conversations/${id}`);
}