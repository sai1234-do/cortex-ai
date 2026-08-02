import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import styles from "./Markdown.module.css";

export default function CodeBlock({ language, value }) {

    

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {

        await navigator.clipboard.writeText(value);

        setCopied(true);

        setTimeout(() => {

            setCopied(false);

        }, 1800);

    };

    return (

        <div className={styles.codeWrapper}>

            <div className={styles.codeHeader}>

                <span>

                    {language || "text"}

                </span>

                <button onClick={handleCopy}>

                    {copied ? (

                        <>
                            <FiCheck />
                            Copied
                        </>

                    ) : (

                        <>
                            <FiCopy />
                            Copy
                        </>

                    )}

                </button>

            </div>

            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    padding: "20px",
                    background: "#0B1220"
                }}
            >

                {value}

            </SyntaxHighlighter>

        </div>

    );

}