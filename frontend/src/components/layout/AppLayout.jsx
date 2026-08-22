import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";

import NewConversationModal from "../../features/conversation/NewConversationModal";

import styles from "./styles/AppLayout.module.css";

import { useLocation } from "react-router-dom";

export default function AppLayout({ children }) {

    const location = useLocation();

    const isChat = location.pathname.startsWith("/chat");

    return (

        <div className={styles.layout}>

            <Sidebar />

            <div className={styles.mainContainer}>

                {!isChat && <Topbar />}

                <main className={styles.mainContent}>

                    {children}

                </main>

                <NewConversationModal />

            </div>

        </div>

    );

}