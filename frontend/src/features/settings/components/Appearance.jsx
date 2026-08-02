import styles from "../styles/Appearance.module.css";
import { useThemeStore } from "../../../store/themeStore";

const themes = [

    {
        id: "dark",
        name: "🌙 Dark"
    },

   

    {
        id: "midnight",
        name: "🌌 Midnight"
    }

];

export default function Appearance() {

    const theme = useThemeStore((state) => state.theme);

    const setTheme = useThemeStore((state) => state.setTheme);

    return (

        <div className={styles.card}>

            <h2>Appearance</h2>

            <p>
                Choose your preferred theme.
            </p>

            <div className={styles.options}>

                {themes.map((item) => (

                    <button

                        key={item.id}

                        onClick={() => setTheme(item.id)}

                        className={`${styles.option} ${
                            theme === item.id ? styles.active : ""
                        }`}

                    >

                        {item.name}

                    </button>

                ))}

            </div>

        </div>

    );

}