import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useConversationStore } from "../../store/conversationStore";
import MessageBubble from "./MessageBubble";

import styles from "./styles/MessageList.module.css";

export default function MessageList() {

    const navigate = useNavigate();

    const { id } = useParams();

    const conversations = useConversationStore(
        state => state.conversations
    );

    const conversation = conversations.find(
        c => String(c.id) === String(id)
    );

    /* ---------------- Chat Guard ---------------- */

    useEffect(() => {

        if (!id) return;

        if (!conversation) {

            navigate("/dashboard", {
                replace: true
            });

        }

    }, [conversation, id, navigate]);

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [conversation]);

    if (!conversation) {

        return null;

    }

    const messages = conversation.messages || [];

    return (

        <div className={styles.messages}>

            <div className={styles.messageContainer}>

                {messages.length === 0 ? (

                    <div className={styles.empty}>

                        <h2>🧠 Cortex</h2>

                        <p>Have a great conversation</p>

                    </div>

                ) : (

                    messages.map((message, index) => (

                        <MessageBubble
                            key={index}
                            role={message.role}
                            content={message.content}
                            thinking={message.thinking}
                            streaming={message.streaming}
                            attachments={message.attachments || []}
                        />

                    ))

                )}

                <div ref={bottomRef}></div>

            </div>

        </div>

    );

}