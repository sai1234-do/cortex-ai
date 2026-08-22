import {
    FiPaperclip,
    FiGlobe,
} from "react-icons/fi";

import { LuBrain } from "react-icons/lu";

import styles from "./styles/PromptActions.module.css";

export default function PromptActions({
    onUploadClick,
    onWebClick,
    onThinkClick
}) {

    return (

        <div className={styles.actions}>

            <button
                className={styles.actionButton}
                onClick={onUploadClick}
                aria-label="Upload file"
                title="Upload"
            >

                <FiPaperclip />

                <span>Upload</span>

            </button>


            <button
                className={styles.actionButton}
                onClick={() => onWebClick?.()}
                aria-label="Web search"
                title="Web"
            >

                <FiGlobe />

                <span>Web</span>

            </button>


            <button
                className={styles.actionButton}
                onClick={() => onThinkClick?.()}
                aria-label="Think"
                title="Think"
            >

                <LuBrain />

                <span>Think</span>

            </button>

        </div>

    );

}