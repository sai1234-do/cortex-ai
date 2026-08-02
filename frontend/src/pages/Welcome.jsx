import { useNavigate } from "react-router-dom";

import { useUIStore } from "../store/uiStore";
import useProjectStore from "../store/projectStore";
import { useConversationStore } from "../store/conversationStore";
import useAuthStore from "../store/authStore";

import styles from "./Welcome.module.css";

export default function Welcome() {

    const navigate = useNavigate();

    const openLogin = useUIStore(
        state => state.openLogin
    );

    const openSignup = useUIStore(
        state => state.openSignup
    );
    const logout = useAuthStore(state => state.logout);

    return (

        <div className={styles.container}>

            <h1>Cortex AI</h1>

            <p>
                Build. Remember. Think.
            </p>

            <button onClick={openLogin}>
                 Login
            </button>

            <button onClick={openSignup}>
                Create Account
            </button>

           <button
             onClick={() => {
              logout();
              navigate("/dashboard");
             }}
           >
              Continue as Guest
          </button>

        </div>

    );

}