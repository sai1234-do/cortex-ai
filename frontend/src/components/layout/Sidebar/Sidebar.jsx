import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";

import styles from "./styles/Sidebar.module.css";

import BrainStatus from "./BrainStatus";
import Navigation from "./Navigation";
import ProjectsPanel from "./ProjectsPanel";
import ConversationList from "./ConversationList";
import AccountPanel from "./AccountPanel";
import PinnedConversations from "./PinnedConversations";

export default function Sidebar() {

    const [mobileOpen, setMobileOpen] = useState(false);

    const location = useLocation();


    /* Close drawer after navigation */

    useEffect(() => {

        setMobileOpen(false);

    }, [location.pathname]);


    /* Prevent background scrolling */

    useEffect(() => {

        if (mobileOpen) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";

        }

        return () => {

            document.body.style.overflow = "";

        };

    }, [mobileOpen]);


    return (

        <>

            {/* Mobile hamburger */}

            <button
                className={styles.mobileToggle}
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar"
                aria-expanded={mobileOpen}
            >

                <FiMenu size={22} />

            </button>


            {/* Overlay */}

            {mobileOpen && (

                <div
                    className={styles.backdrop}
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />

            )}


            {/* Sidebar */}

            <aside
                className={`
                    ${styles.sidebar}
                    ${mobileOpen ? styles.mobileOpen : ""}
                `}
            >

                {/* Close button */}

                <button
                    className={styles.closeButton}
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close sidebar"
                >

                    <FiX size={22} />

                </button>


                <div className={styles.brand}>

                    <h2>🧠 Cortex</h2>

                    <p>
                        Personal Cognitive OS
                    </p>

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