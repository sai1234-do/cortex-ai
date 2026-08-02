import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import styles from "./styles/Sidebar.module.css";

import BrainStatus from "./BrainStatus";
import Navigation from "./Navigation";
import ProjectsPanel from "./ProjectsPanel";
import ConversationList from "./ConversationList";
import AccountPanel from "./AccountPanel";
import PinnedConversations from "./PinnedConversations";

export default function Sidebar() {

    const [mobileOpen, setMobileOpen] = useState(false);

    return (

        <>

            <button
                className={styles.mobileToggle}
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar"
            >
                <FiMenu size={22} />
            </button>

            {mobileOpen && (

                <div
                    className={styles.backdrop}
                    onClick={() => setMobileOpen(false)}
                />

            )}

            <aside
                className={`${styles.sidebar} ${
                    mobileOpen ? styles.mobileOpen : ""
                }`}
            >

                <button
                    className={styles.closeButton}
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close sidebar"
                >
                    <FiX size={22} />
                </button>

                <div className={styles.brand}>
                    <h2>🧠 Cortex</h2>
                    <p>Personal Cognitive OS</p>
                </div>

                <BrainStatus />

                <Navigation />

                <div className={styles.scrollArea}>

                    <PinnedConversations />

                    <ProjectsPanel />

                    <ConversationList />

                    <AccountPanel />

                    <div className={styles.footer}>

                        <div className={styles.footerTitle}>
                            Cortex AI v-1.0
                        </div>

                        <div className={styles.footerVersion}>
                            © 2026
                        </div>

                        <div className={styles.footerAuthor}>
                            Built by Donthula Saicharan
                        </div>

                    </div>

                </div>

            </aside>

        </>

    );

}