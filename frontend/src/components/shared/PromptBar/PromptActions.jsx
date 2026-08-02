import {
    FiPaperclip,
    FiGlobe,
} from "react-icons/fi";

import { LuBrain } from "react-icons/lu";

import styles from "./styles/PromptActions.module.css";

export default function PromptActions({ onUploadClick,onWebClick,onThinkClick }) {

    return (

        <div className={styles.actions}>

            <button
                className={styles.actionButton}
                onClick={onUploadClick}
            >
                <FiPaperclip />
                Upload
            </button>

            <button
             className={styles.actionButton}
             onClick={() => {
                
                onWebClick?.();
            }}
            >
                <FiGlobe />
                 Web
           </button>

           <button
            className={styles.actionButton}
            onClick={() => {
              console.log("THINK BUTTON CLICKED");
              onThinkClick?.();
            }}
            >
              <LuBrain />
               Think
           </button>

        </div>

    );

}