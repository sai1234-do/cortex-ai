import { useLoadingStore } from "../../../store/loadingStore";

import styles from "./GlobalLoader.module.css";

export default function GlobalLoader() {

    const {

        loading,

        message

    } = useLoadingStore();

    if (!loading) return null;

    return (

        <div className={styles.overlay}>

            <div className={styles.box}>

                <div className={styles.spinner}></div>

                <span>{message}</span>

            </div>

        </div>

    );

}