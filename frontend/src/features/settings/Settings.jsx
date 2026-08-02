import styles from "./styles/Settings.module.css";
import Appearance from "./components/Appearance";

export default function Settings() {

    return (

        <div className={styles.container}>

            <h1>⚙ Settings</h1>

            <p>
                Customize your Cortex AI experience.
            </p>

            <Appearance />

        </div>

    );

}