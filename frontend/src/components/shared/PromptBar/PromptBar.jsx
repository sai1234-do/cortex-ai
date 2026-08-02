import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FiFile, FiX } from "react-icons/fi";

import { useConversationStore } from "../../../store/conversationStore";
import { useUIStore } from "../../../store/uiStore";

import PromptInput from "./PromptInput";
import PromptActions from "./PromptActions";
import PromptSend from "./PromptSend";
import useAuthStore from "../../../store/authStore";




import styles from "./styles/PromptBar.module.css";

import { streamChat } from "../../../services/chatService";
import { uploadFile } from "../../../services/uploadService";


import {
    renameConversation as renameConversationAPI
} from "../../../services/conversationService";


export default function PromptBar({ mode = "chat",onWebClick,onThinkClick}) {
    

    const [prompt, setPrompt] = useState("");
    

    const { id } = useParams();

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        if (!user) {

        openGuestRestriction({

            feature: "upload",

            description:
                "Uploading files is available only for registered Cortex users."

        });

        return;

    }

    fileInputRef.current.click();


};
    const user = useAuthStore(state=>state.user);

    const openGuestRestriction = useUIStore(
      state=>state.openGuestRestriction
   );

    /* ---------------- UI Store ---------------- */

    const uploadedFiles = useUIStore(
        state => state.uploadedFiles
    );

    const addUploadedFile = useUIStore(
        state => state.addUploadedFile
    );

    const removeUploadedFile = useUIStore(
        state => state.removeUploadedFile
    );

    const clearUploadedFiles = useUIStore(
        state => state.clearUploadedFiles
    );

    /* ---------------- Conversation Store ---------------- */

    const addMessage = useConversationStore(
        state => state.addMessage
    );

    const startAssistantResponse = useConversationStore(
        state => state.startAssistantResponse
    );

    const appendAssistantChunk = useConversationStore(
        state => state.appendAssistantChunk
    );

    const finishAssistantResponse = useConversationStore(
        state => state.finishAssistantResponse
    );

    const renameConversation = useConversationStore(
        state => state.renameConversation
    );

    const isStreaming = useConversationStore(
        state => state.isStreaming
    );

    /* ---------------- Helpers ---------------- */

    function generateTitle(text) {

        return text
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .slice(0, 5)
            .join(" ");

    }

    /* ---------------- Upload ---------------- */
      const handleFileUpload = async (event) => {

      const file = event.target.files[0];

      if (!file) return;

      try {

        const uploaded = await uploadFile(file);

        console.log("Backend:", uploaded);

        addUploadedFile({
            id: uploaded.id,
            name: uploaded.filename
        });

      } catch (err) {

        console.error(err);

       }

    };
   

    /* ---------------- Send ---------------- */

    const handleSend = async () => {

        if (!prompt.trim() || isStreaming) return;

        if (!id) return;

        const conversationId = String(id);

        const userPrompt = prompt;

        setPrompt("");

        addMessage(conversationId, {
            role: "user",
            content: userPrompt,
            attachments: [...uploadedFiles]
        });

        startAssistantResponse(conversationId);

        try {
            if (!user) {

              finishAssistantResponse(conversationId);

              openGuestRestriction({
 
                feature: "chat",

                description:
                "Create a free Cortex account to start chatting with AI."

             });

            return;

            }

            await streamChat(

                conversationId,

                userPrompt,

                uploadedFiles.map(file => file.id),

                (chunk) => {

                    appendAssistantChunk(
                        conversationId,
                        chunk
                    );

                }

            );

            clearUploadedFiles();

        } catch (error) {

            console.error(error);

            appendAssistantChunk(
                conversationId,
                "\n\n⚠️ Failed to connect to backend."
            );

        } finally {

            finishAssistantResponse(conversationId);

          
    const state = useConversationStore.getState();

    const conversation = state.conversations.find(

        c => String(c.id) === conversationId

    );
    

    if (

        conversation &&

        conversation.title === "New Conversation"

    ) {

        const title = generateTitle(userPrompt);

        renameConversation(conversationId, title);
        if (!conversation.guest) {
          try {

            await renameConversationAPI(

                conversationId,

                title

            );

          } catch (err) {

            console.error(err);

        } }

    }

}

    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            handleSend();

        }

    };
   
    return (
    

        <div
            className={
                mode === "dashboard"
                    ? styles.dashboardPrompt
                    : styles.promptContainer
            }
        >

            {uploadedFiles.length > 0 && (

                <div className={styles.fileContainer}>

                    {uploadedFiles.map(file => (

                        <div
                            key={file.id}
                            className={styles.fileChip}
                        >

                            <FiFile />

                            <span>{file.name}</span>

                            <button
                                onClick={() =>
                                    removeUploadedFile(file.id)
                                }
                            >

                                <FiX />

                            </button>

                        </div>

                    ))}

                </div>

            )}

            <PromptInput
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isStreaming}
            />

            <div className={styles.bottomRow}>

               <PromptActions
                onUploadClick={handleUploadClick}
                onWebClick={onWebClick}
                onThinkClick={onThinkClick}
              />

                <PromptSend
                    onSend={handleSend}
                    disabled={isStreaming}
                />

            </div>

            <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={handleFileUpload}
            />
            

        </div>

    );

}