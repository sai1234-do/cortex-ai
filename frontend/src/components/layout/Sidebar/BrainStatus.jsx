import styles from "./styles/BrainStatus.module.css";

export default function BrainStatus() {

    return (

        <div className={styles.container}>

            <div className={styles.indicator}></div>

            <div className={styles.info}>

                <h4 className={styles.title}>
                    Brain Status
                </h4>

                <p className={styles.subtitle}>
                    Learning...
                </p>

            </div>

        </div>

    );

}