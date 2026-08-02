import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useConversationStore } from "../../store/conversationStore";
import { getMessages } from "../../services/messageService";

import MessageList from "./MessageList";
import ChatPromptBar from "./components/ChatPromptBar";

import FeaturePreviewModal from "../dashboard/components/common/FeaturePreviewModal";

import { FiGlobe, FiCpu } from "react-icons/fi";
import { FiShare2 } from "react-icons/fi";
import toast from "react-hot-toast";

import styles from "./styles/ChatLayout.module.css";

export default function ChatLayout() {

    const { id } = useParams();

    const {
        setActiveConversation,
        conversations,
        setConversations
    } = useConversationStore();

    const [modal, setModal] = useState(null);

    useEffect(() => {

        if (!id) return;

        setActiveConversation(String(id));

        async function loadMessages() {

            try {

                const messages = await getMessages(id);

                setConversations(

                    conversations.map(c =>

                        String(c.id) === String(id)

                            ? {
                                  ...c,
                                  messages
                              }

                            : c

                    )

                );

            } catch (err) {

                console.error(err);

            }

        }

        loadMessages();

    }, [id]);
    const handleShare = async () => {
     try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Conversation link copied!");
     } catch {
        toast.error("Unable to copy link.");
      }
   };

    return (

        <>

            <div className={styles.layout}>
                <div className={styles.chatHeader}>
                    <button
                      className={styles.shareButton}
                      onClick={handleShare}
                    >
                        <FiShare2 size={16}/>
                       <span>Share</span>
                   </button>
                </div>
        

                <div className={styles.messages}>
                    <MessageList />
                </div>

                <div className={styles.prompt}>

                    <ChatPromptBar

                        onWebClick={() =>

                            setModal({

                                title: "🌐 Web Search",

                                description:
                                    "Web Search mode will allow Cortex AI to search the internet and answer using trusted sources.",

                                icon: <FiGlobe />

                            })

                        }

                        onThinkClick={() =>

                            setModal({

                                title: "🧠 Think Mode",

                                description:
                                    "Think Mode will use deeper reasoning before answering complex questions.",

                                icon: <FiCpu />

                            })

                        }

                    />

                </div>

            </div>

            <FeaturePreviewModal

                open={!!modal}

                title={modal?.title}

                description={modal?.description}

                icon={modal?.icon}

                onClose={() => setModal(null)}

            />

        </>

    );

}