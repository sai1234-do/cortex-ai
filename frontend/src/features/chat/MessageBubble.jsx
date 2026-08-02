import { motion } from "framer-motion";

import styles from "./styles/MessageBubble.module.css";

import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import MessageActions from "./components/MessageActions";

export default function MessageBubble({

    role,

    content,

    thinking,

    streaming,
    attachments = []

}) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 18
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.25
            }}

            className={`${styles.message} ${
                role === "user"
                    ? styles.user
                    : styles.assistant
            }`}

        >

            <div className={styles.bubble}>

                {thinking &&  content.length === 0 ? (

                    <div className={styles.thinking}>

                        <span />
                        <span />
                        <span />

                    </div>

                ) : (

                    <>
                    {attachments.length > 0 && (

                    <div className={styles.attachments}>

                      {attachments.map(file => (

                           <div
                             key={file.id}
                             className={styles.attachmentChip}
                           >
             
                             📄 {file.name}

                          </div>

               ))}

           </div>

        )}

                        {streaming ? (
                            
                          <pre
                             style={{
                               whiteSpace: "pre-wrap",
                               margin: 0,
                               fontFamily: "inherit"
                            }}
                          >
                                 {content}
                          </pre>
                       ) : (
                          <MarkdownRenderer content={content} />
                      )}

                        {role === "assistant" && (

                            <MessageActions
                                content={content}
                            />

                        )}

                    </>

                )}

            </div>

        </motion.div>

    );

}