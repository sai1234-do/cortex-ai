import api from "./api";

export async function signup(data) {

    const response = await api.post(
        "/signup",
        data
    );

    return response.data;
}

export async function login(data) {

    const response = await api.post(
        "/login",
        data
    );

    return response.data;
}

export async function forgotPassword(email) {

    const response = await api.post(

        "/forgot-password",

        { email }

    );

    return response.data;
}

export async function resetPassword(data) {

    const response = await api.post(

        "/reset-password",

        data

    );

    return response.data;
}