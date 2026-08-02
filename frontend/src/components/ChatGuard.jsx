import { Navigate, useParams } from "react-router-dom";

import { useConversationStore } from "../store/conversationStore";

export default function ChatGuard({ children }) {

    const { id } = useParams();

    const conversations = useConversationStore(
        state => state.conversations
    );

    const exists = conversations.some(
        c => String(c.id) === String(id)
    );

    if (!exists) {

        return <Navigate to="/dashboard" replace />;

    }

    return children;
}