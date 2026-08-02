import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import {
    FiSearch,
    FiShare2,
    FiPlus,
    FiLink,
    FiMail,
    FiMenu
} from "react-icons/fi";

import styles from "./styles/Topbar.module.css";
import { useUIStore } from "../../../store/uiStore";
import toast from "react-hot-toast";

export default function Topbar() {

    const location = useLocation();

    const openNewConversation = useUIStore(
        state => state.openNewConversation
    );

    const [showShare, setShowShare] = useState(false);

    const shareRef = useRef(null);

    useEffect(() => {

        function handleOutside(e) {

            if (
                shareRef.current &&
                !shareRef.current.contains(e.target)
            ) {
                setShowShare(false);
            }

        }

        document.addEventListener("mousedown", handleOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleOutside
            );

    }, []);

    async function copyLink() {

        await navigator.clipboard.writeText(
            window.location.origin + location.pathname
        );

        toast.success("Link copied!");

        setShowShare(false);

    }

    function shareEmail() {

        const subject = encodeURIComponent(
            "Cortex AI Conversation"
        );

        const body = encodeURIComponent(
`Hi,

I wanted to share this Cortex AI conversation.

${window.location.origin}${location.pathname}`
        );

        window.location.href =
            `mailto:?subject=${subject}&body=${body}`;

        setShowShare(false);

    }

    return (

        <header className={styles.topbar}>

            <div className={styles.leftSection}>

                <button className={styles.menuBtn}>
                    <FiMenu />
                </button>

                <div className={styles.brand}>

                    <h2>🧠 Cortex</h2>

                    <span>Personal Workspace</span>

                </div>

            </div>

            <div className={styles.searchContainer}>

                <FiSearch />

                <input
                    placeholder="Search..."
                />

            </div>

            <div className={styles.actions}>

                <button
                    className={styles.newChat}
                    onClick={openNewConversation}
                >

                    <FiPlus />

                    <span>New Conversation</span>

                </button>

                <div
                    className={styles.shareWrapper}
                    ref={shareRef}
                >

                    <button
                        onClick={() =>
                            setShowShare(!showShare)
                        }
                    >
                        <FiShare2 />
                        Share
                    </button>

                    {showShare && (

                        <div className={styles.shareMenu}>

                            <button onClick={copyLink}>
                                <FiLink />
                                Copy Link
                            </button>

                            <button onClick={shareEmail}>
                                <FiMail />
                                Email
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );

}