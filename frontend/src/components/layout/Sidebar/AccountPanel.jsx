import { Link } from "react-router-dom";
import {
    Settings,
    CircleHelp,
    LogOut,
    User
} from "lucide-react";

import { useState } from "react";

import styles from "./styles/AccountPanel.module.css";

import useAuthStore from "../../../store/authStore";
import { useUIStore } from "../../../store/uiStore";

import HelpModal from "../../HelpModal/HelpModal";

export default function AccountPanel() {

    const [showHelp, setShowHelp] = useState(false);

    const user = useAuthStore(
        state => state.user
    );

    const logout = useAuthStore(
        state => state.logout
    );

    const openLogin = useUIStore(
        state => state.openLogin
    );

    const openSignup = useUIStore(
        state => state.openSignup
    );

    /* ---------------- Guest ---------------- */

    if (!user) {

        return (

            <>

                <div className={styles.panel}>

                    <div className={styles.profile}>

                        <div className={styles.avatar}>
                            <User size={18} />
                        </div>

                        <div>
                            <h4>Guest</h4>
                            <p>Limited Access</p>
                        </div>

                    </div>

                    <div className={styles.actions}>

                        <button
                            className={styles.item}
                            onClick={openLogin}
                        >
                            <User size={18} />
                            <span>Login</span>
                        </button>

                        <button
                            className={styles.item}
                            onClick={openSignup}
                        >
                            <User size={18} />
                            <span>Signup</span>
                        </button>

                    </div>

                </div>

                {showHelp && (
                    <HelpModal
                        onClose={() => setShowHelp(false)}
                    />
                )}

            </>

        );

    }

    /* ---------------- Logged User ---------------- */

    return (

        <>

            <div className={styles.panel}>

                <div className={styles.profile}>

                    <div className={styles.avatar}>
                        <User size={18} />
                    </div>

                    <div>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                    </div>

                </div>

                <div className={styles.actions}>

                    <Link
                        to="/settings"
                        className={styles.item}
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>

                    <button
                        className={styles.item}
                        onClick={() => setShowHelp(true)}
                    >
                        <CircleHelp size={18} />
                        <span>Help</span>
                    </button>

                    <button
                        className={styles.item}
                        onClick={logout}
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>

                </div>

            </div>

            {showHelp && (
                <HelpModal
                    onClose={() => setShowHelp(false)}
                />
            )}

        </>

    );

}