import {
    FiMic,
    FiSend,
} from "react-icons/fi";

import styles from "./styles/PromptSend.module.css";

export default function PromptSend({ onSend, disabled }) {

    return (
           
      <div style={{display:"flex",gap:"12px",alignItems:"center"}}>

            

            <button
                className={styles.sendButton}
                onClick={onSend}
                disabled={disabled}
            >
                <FiSend />
            </button>

        </div>

    );

}