import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({

    baseURL: "https://cortex-ai-backend-bcoa.onrender.com/api/v1",

    timeout: 30000

});

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

api.interceptors.response.use(

    (response) => response,

    (error) => {

        // -------------------------
        // Network Error
        // -------------------------

        if (!error.response) {

            console.error("Network Error");

            toast.error(
                "Unable to connect to Cortex server."
            );

            return Promise.reject(error);

        }

        // -------------------------
        // Unauthorized
        // -------------------------

   if (error.response.status === 401) {

    // Guest users should NOT be redirected
     const isGuest =
        localStorage.getItem("guest") === "true";

     if (!isGuest) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";

     }

    return Promise.reject(error);

  }

        // -------------------------
        // Forbidden
        // -------------------------

        if (error.response.status === 403) {

            toast.error("You don't have permission to perform this action.");

        }

        // -------------------------
        // Not Found
        // -------------------------

        if (error.response.status === 404) {

            console.warn("Requested resource not found.");

        }

        // -------------------------
        // Validation Error
        // -------------------------

        if (error.response.status === 422) {

            console.warn(error.response.data);

        }

        // -------------------------
        // Internal Server Error
        // -------------------------

        if (error.response.status >= 500) {

            toast.error("Cortex server encountered an unexpected error.");

        }

        return Promise.reject(error);

    }

);

export default api;