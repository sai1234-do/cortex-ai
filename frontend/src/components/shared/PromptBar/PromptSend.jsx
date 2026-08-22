import {
    FiSend,
} from "react-icons/fi";

import styles from "./styles/PromptSend.module.css";

export default function PromptSend({ onSend, disabled }) {

    return (

        <button
            className={styles.sendButton}
            onClick={onSend}
            disabled={disabled}
            aria-label="Send message"
        >

            <FiSend />

        </button>

    );

}