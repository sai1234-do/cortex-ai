import { useUIStore } from "../../store/uiStore";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import styles from "./styles/AuthModal.module.css";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function AuthModal() {

    const show = useUIStore(
        state => state.showAuthModal
    );

    const mode = useUIStore(
        state => state.authMode
    );

    const close = useUIStore(
        state => state.closeAuthModal
    );
    console.log("AUTH MODAL", {
      show,
      mode
    });
    if (!show) return null;

    return (

        <div
            className={styles.overlay}
            onClick={close}
        >

            <div
                className={styles.modal}
                onClick={(e)=>e.stopPropagation()}
            >

                {mode === "login" && <LoginForm />}

                {mode === "signup" && <SignupForm />}

                {mode === "forgot" && <ForgotPasswordForm />}

            </div>

        </div>

    );

}