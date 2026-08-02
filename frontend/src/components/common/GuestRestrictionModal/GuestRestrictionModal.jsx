import { useUIStore } from "../../../store/uiStore";

import styles from "./GuestRestrictionModal.module.css";

export default function GuestRestrictionModal() {

    const show = useUIStore(
        state => state.showGuestRestriction
    );

    const feature = useUIStore(
        state => state.guestFeature
    );

    const close = useUIStore(
        state => state.closeGuestRestriction
    );

    const openLogin = useUIStore(
        state => state.openLogin
    );

    const openSignup = useUIStore(
        state => state.openSignup
    );

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

                <div className={styles.icon}>
                    🔒
                </div>

                <h2>
                    Login Required
                </h2>

                <p>
                    {feature?.description}
                </p>

                <div className={styles.actions}>

                    <button
                        className={styles.signup}
                        onClick={()=>{
                            close();
                            openSignup();
                        }}
                    >
                        Create Account
                    </button>

                    <button
                        className={styles.login}
                        onClick={()=>{
                            close();
                            openLogin();
                        }}
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>

    );

}