import styles from "./HelpModal.module.css";

export default function HelpModal({ onClose }) {

    return (

        <div
            className={styles.overlay}
            onClick={onClose}
        >

            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >

                <div className={styles.header}>

                    <h2>🧠 Cortex Guide</h2>

                    <button onClick={onClose}>
                        ✕
                    </button>

                </div>

                {/* Quick Start */}

                <section>

                    <h3>🚀 Quick Start</h3>

                    <ol>

                        <li>Create a Project.</li>

                        <li>Select the Project from the Projects panel.</li>

                        <li>Create a Conversation inside the selected Project.</li>

                        <li>Select an AI Agent.</li>

                        <li>Start chatting.</li>

                        

                    </ol>

                    <div
                        style={{
                            marginTop: "12px",
                            padding: "10px",
                            borderRadius: "8px",
                            background: "#1e293b",
                            color: "#f8fafc",
                            fontSize: "13px"
                        }}
                    >

                        💡 <strong>Note</strong>

                        <br />

                        Conversations can only be created after selecting a
                        Project. Every conversation belongs to one Project to
                        keep your work organized.

                    </div>

                </section>

                {/* Shortcuts */}

                <section>

                    <h3>⌨ Keyboard Shortcuts</h3>

                    <table>

                        <tbody>

                            <tr>

                                <td>Ctrl + N</td>

                                <td>New Conversation</td>

                            </tr>

                            <tr>

                                <td>Ctrl + Shift + P</td>

                                <td>New Project</td>

                            </tr>

                            <tr>

                                <td>Esc</td>

                                <td>Close Dialog</td>

                            </tr>

                        </tbody>

                    </table>

                </section>

                {/* FAQ */}

                <section>

                    <h3>❓ FAQ</h3>

                    <details>

                        <summary>Why can't I create a conversation?</summary>

                        <p>

                            A Project must be selected before creating a
                            conversation. This keeps every conversation grouped
                            under the correct project.

                        </p>

                    </details>

                    <details>

                        <summary>What is a Project?</summary>

                        <p>

                            A Project is a workspace that groups related
                            conversations together.

                        </p>

                    </details>

                    <details>

                        <summary>Can I have multiple conversations?</summary>

                        <p>

                            Yes. Each Project can contain multiple independent
                            conversations.

                        </p>

                    </details>

                    <details>

                        <summary>How do AI Agents work?</summary>

                        <p>

                            AI Agents specialize in different tasks such as
                            coding, reasoning, research, writing, and more.
                            Choose the one that best matches your task.

                        </p>

                    </details>

                    <details>

                        <summary>Where is my data stored?</summary>

                        <p>

                            Your conversations, projects, and memories are
                            securely stored in your Cortex backend database.

                        </p>

                    </details>

                </section>

                {/* Contact */}

                <section>

                    <h3>📧 Contact</h3>

                    <p>
                        support@cortex.ai
                    </p>

                    <p>
                        Version 1.0.0
                    </p>

                    <p>
                        Built by Donthula Saicharan
                    </p>

                </section>

            </div>

        </div>

    );

}