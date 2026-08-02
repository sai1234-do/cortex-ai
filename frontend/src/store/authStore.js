import { create } from "zustand";

import useProjectStore from "./projectStore";
import { useConversationStore } from "./conversationStore";

const useAuthStore = create((set) => ({

    user: JSON.parse(localStorage.getItem("user")),

    token: localStorage.getItem("token"),

    login: (user, token) => {

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        localStorage.setItem(
            "token",
            token
        );

        set({
            user,
            token
        });

    },

    logout: () => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");
       

        // clear persisted stores
        localStorage.removeItem("cortex-project");
        localStorage.removeItem("cortex-conversations");

        useProjectStore.setState({
            projects: [],
            selectedProject: null
        });

        useConversationStore.setState({
            conversations: [],
            activeConversationId: null,
            isStreaming: false
        });

        set({

            user: null,

            token: null

        });

    }

}));

export default useAuthStore;