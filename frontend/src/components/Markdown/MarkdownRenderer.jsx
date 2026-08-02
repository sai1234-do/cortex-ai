import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";
import styles from "./Markdown.module.css";

export default function MarkdownRenderer({ content }) {
    return (
        <div className={styles.markdown}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ inline, className, children }) {

                        const match = /language-(\w+)/.exec(className || "");

                        if (inline || !match) {
                            return (
                                <code className={className}>
                                    {children}
                                </code>
                            );
                        }

                        return (
                            <CodeBlock
                                language={match[1]}
                                value={String(children).replace(/\n$/, "")}
                            />
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}