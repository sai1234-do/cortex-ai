import api from "./api";

export async function getProjects() {

    const response = await api.get("/projects");

    return response.data;
}

export async function createProject(name) {

    const response = await api.post("/projects", {
        name
    });

    return response.data;
}

export async function renameProject(id, name) {

    const response = await api.put(`/projects/${id}`, {
        name
    });

    return response.data;
}

export async function deleteProject(id) {

    await api.delete(`/projects/${id}`);
}