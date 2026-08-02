import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiCheck, FiX } from "react-icons/fi";
import { LuPencil, LuTrash2 } from "react-icons/lu";

import { useConversationStore } from "../../../store/conversationStore";
import useProjectStore from "../../../store/projectStore";

import {
    renameConversation as renameConversationAPI,
    deleteConversation as deleteConversationAPI,
} from "../../../services/conversationService";

import ConfirmDialog from "../../common/ConfirmDialog";
import styles from "./styles/ConversationList.module.css";
import { LuPin } from "react-icons/lu";
import { usePinnedConversationStore } from "../../../store/pinnedConversationStore";
import toast from "react-hot-toast";

export default function ConversationList() {

    const navigate = useNavigate();

    const selectedProject = useProjectStore(
        state => state.selectedProject
    );

    const {
        conversations,
        activeConversationId,
        setActiveConversation,
        renameConversation,
        deleteConversation,
    } = useConversationStore();

    const [editingId, setEditingId] = useState(null);
    const [title, setTitle] = useState("");

    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const filtered = selectedProject
        ? conversations.filter(
              c => Number(c.project_id) === Number(selectedProject.id)
          )
        : [];
    const { pinnedIds, togglePin } = usePinnedConversationStore();

    const pinned = filtered.filter(c =>
      pinnedIds.includes(String(c.id))
    );

    const recent = filtered.filter(c =>
      !pinnedIds.includes(String(c.id))
    );

    async function saveRename() {

        const newTitle = title.trim() || "New Conversation";

        try {

            await renameConversationAPI(editingId, newTitle);

            renameConversation(editingId, newTitle);

        } catch (err) {

            console.error(err);

        }

        setEditingId(null);

    }

    async function handleDelete() {

        if (!deleteId) return;

        try {

            setDeleting(true);

            await deleteConversationAPI(deleteId);

            deleteConversation(deleteId);

            const remaining =
                useConversationStore
                    .getState()
                    .conversations
                    .filter(
                        c =>
                            Number(c.project_id) ===
                            Number(selectedProject.id)
                    );

            if (remaining.length === 0) {

                navigate("/dashboard");

            } else {

                setActiveConversation(
                    String(remaining[0].id)
                );

                navigate(`/chat/${remaining[0].id}`);

            }

        } catch (err) {

            console.error(err);

        } finally {

            setDeleting(false);

            setDeleteId(null);

        }

    }

    return (

        <>

            <div className={styles.list}>

                <h4 className={styles.heading}>
                    Recent Conversations
                </h4>

                {[...pinned, ...recent].map(conversation => (

                    <div
                        key={conversation.id}
                        className={`${styles.item} ${
                            activeConversationId === String(conversation.id)
                                ? styles.active
                                : ""
                        }`}
                        onClick={() => {

                            if (editingId) return;

                            setActiveConversation(
                                String(conversation.id)
                            );

                            navigate(`/chat/${conversation.id}`);

                        }}
                    >

                        {editingId === conversation.id ? (

                            <>

                                <input
                                    autoFocus
                                    className={styles.renameInput}
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    onKeyDown={(e) => {

                                        if (e.key === "Enter")
                                            saveRename();

                                        if (e.key === "Escape")
                                            setEditingId(null);

                                    }}
                                />

                                <div className={styles.actions}>

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            saveRename();

                                        }}
                                    >
                                        <FiCheck />
                                    </button>

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            setEditingId(null);

                                        }}
                                    >
                                        <FiX />
                                    </button>

                                </div>

                            </>

                        ) : (

                            <>

                                <span className={styles.title}>
                                    {conversation.title}
                                </span>

                                <div className={styles.actions}>
                                 <button
                                     onClick={(e) => {

                                     e.stopPropagation();

                                     const isPinned = pinnedIds.includes(String(conversation.id));

                                     togglePin(String(conversation.id));

                                    if (isPinned) {

                                      toast.error("Conversation unpinned");

                                    } else {

                                       toast.success("Conversation pinned");

                                    }

                                 }}
                                    title={
                                      pinnedIds.includes(String(conversation.id))
                                           ? "Unpin"
                                           : "Pin"
                                    }
                                 >
                                   <LuPin
                                      size={16}
                                      style={{
                                        color: pinnedIds.includes(String(conversation.id))
                                        ? "#f59e0b"
                                        : undefined
                                      }}
                                   />
                                </button>

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            setEditingId(conversation.id);

                                            setTitle(conversation.title);

                                        }}
                                    >
                                        <LuPencil size={16} />
                                    </button>

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            setDeleteId(conversation.id);

                                        }}
                                    >
                                        <LuTrash2 size={16} />
                                    </button>

                                </div>

                            </>

                        )}

                    </div>

                ))}

                {filtered.length === 0 && (

                    <div className={styles.emptyState}>

                        <div className={styles.emptyIcon}>
                            💬
                        </div>

                        <h4>No conversations yet</h4>

                        <p>
                            Create your first conversation inside  project.
                        </p>

                    </div>

                )}

            </div>

            <ConfirmDialog
                open={deleteId !== null}
                title="Delete Conversation"
                message="This conversation will be permanently deleted."
                confirmText="Delete"
                loading={deleting}
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />

        </>

    );

}