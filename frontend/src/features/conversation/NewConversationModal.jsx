import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useConversationStore } from "../../store/conversationStore";
import useProjectStore from "../../store/projectStore";
import { useUIStore } from "../../store/uiStore";

import { ASSISTANT_MODES } from "../../constants/assistantModes";
import ConversationTypeCard from "./ConversationTypeCard";

import { createConversation } from "../../services/conversationService";
import useAuthStore from "../../store/authStore";

import styles from "./styles/NewConversationModal.module.css";

export default function NewConversationModal() {

    const show = useUIStore(
        state => state.showNewConversation
    );

    const close = useUIStore(
        state => state.closeNewConversation
    );

    const selected = useUIStore(
        state => state.selectedAssistant
    );

    const setSelected = useUIStore(
        state => state.setSelectedAssistant
    );

    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);

    const selectedProject = useProjectStore(
        state => state.selectedProject
    );

    const addConversation = useConversationStore(
        state => state.addConversation
    );

    const setActiveConversation = useConversationStore(
        state => state.setActiveConversation
    );

    const [creating, setCreating] = useState(false);

    if (!show) return null;

 async function handleContinue() {

    if (!selectedProject || !selected || creating)
        return;

    // -----------------------
    // Guest Mode
    // -----------------------
    if (!user) {

        const conversation = {

            id: "guest-chat-" + Date.now(),

            project_id: selectedProject.id,

            title: "New Conversation",

            assistant: selected,

            guest: true,

            messages: []

        };

        addConversation(conversation);

        setActiveConversation(String(conversation.id));

        navigate(`/chat/${conversation.id}`);

        close();

        return;
    }

    // -----------------------
    // Logged User
    // -----------------------

    try {

        setCreating(true);

        const conversation =
            await createConversation(selectedProject.id);

        addConversation({

            id: String(conversation.id),

            project_id: conversation.project_id,

            title: conversation.title,

            assistant: selected,

            messages: []

        });

        setActiveConversation(String(conversation.id));

        navigate(`/chat/${conversation.id}`);

        close();

    }

    catch (err) {

        console.error(err);

    }

    finally {

        setCreating(false);

    }

}

    return (

        <div className={styles.overlay}>

            <div className={styles.modal}>

                <h2 className={styles.title}>
                    Choose Your AI Agent
                </h2>

                <p className={styles.subtitle}>
                    Select the best AI agent for your task.
                </p>

                {!selectedProject && (

                    <div
                        style={{
                            background: "#FFF7ED",
                            border: "1px solid #FDBA74",
                            color: "#9A3412",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "16px",
                            fontSize: "14px"
                        }}
                    >

                        ⚠️ Select a Project first before creating a conversation.

                    </div>

                )}

                {ASSISTANT_MODES.map(assistant => (

                    <ConversationTypeCard
                        key={assistant.id}
                        assistant={assistant}
                        selected={
                            selected?.id === assistant.id
                        }
                        onClick={() => {

                            if (!creating)
                                setSelected(assistant);

                        }}
                    />

                ))}

                <div className={styles.footer}>

                    <button
                        className={styles.cancel}
                        onClick={close}
                        disabled={creating}
                    >
                        Cancel
                    </button>

                    <button
                        className={styles.continue}
                        disabled={
                            !selected ||
                            !selectedProject ||
                            creating
                        }
                        title={
                            !selectedProject
                                ? "Select a project first"
                                : ""
                        }
                        onClick={handleContinue}
                    >

                        {creating
                            ? "Creating..."
                            : "Continue →"}

                    </button>

                </div>

            </div>

        </div>

    );

}