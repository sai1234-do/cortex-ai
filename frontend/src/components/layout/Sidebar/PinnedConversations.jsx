import { useNavigate } from "react-router-dom";

import { useConversationStore } from "../../../store/conversationStore";
import { usePinnedConversationStore } from "../../../store/pinnedConversationStore";
import toast from "react-hot-toast";

import styles from "./styles/PinnedConversations.module.css";

export default function PinnedConversations() {

    const navigate = useNavigate();

    const conversations = useConversationStore(
        state => state.conversations
    );

    const setActiveConversation = useConversationStore(
        state => state.setActiveConversation
    );

    const pinnedIds = usePinnedConversationStore(
        state => state.pinnedIds
    );
    const togglePin = usePinnedConversationStore(
         state => state.togglePin
    );

    const pinned = conversations.filter(c =>
        pinnedIds.includes(String(c.id))
    );

    if (pinned.length === 0) return null;

    return (

        <div className={styles.wrapper}>

            <h4 className={styles.heading}>
                📌 Pinned
            </h4>

            {pinned.map(conversation => (

              <div
    key={conversation.id}
    className={styles.item}
    onClick={() => {
        setActiveConversation(String(conversation.id));
        navigate(`/chat/${conversation.id}`);
    }}
>

    <div className={styles.row}>

        <span className={styles.title}>
            {conversation.title}
        </span>

        <button
            className={styles.unpin}
            onClick={(e) => {
                e.stopPropagation();
                togglePin(String(conversation.id));

                toast.error("Conversation unpinned");
            }}
        >
            ✕
        </button>

    </div>

</div>
))}

        </div>

    );

}