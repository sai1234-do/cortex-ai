import { useEffect, useRef } from "react";

import styles from "./styles/PromptInput.module.css";

export default function PromptInput({
    value,
    onChange,
    onKeyDown,
    disabled
}) {

    const textareaRef = useRef(null);

    useEffect(() => {

        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "0px";

        textarea.style.height =
            Math.min(textarea.scrollHeight, 180) + "px";

    }, [value]);

    return (

        <textarea
            ref={textareaRef}
            className={styles.promptInput}
            
            placeholder="Ask Cortex anything..."
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            rows={1}
            disabled={disabled}
        />

    );

}