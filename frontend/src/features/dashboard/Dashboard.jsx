import styles from "./styles/Dashboard.module.css";
import QuickStart from "./components/QuickStart";



export default function Dashboard() {

    
    return (

        <div className={styles.dashboard}>
            

            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.badge}>
                        CORTEX OS
                    </span>

                    <h1>Cortex Workspace</h1>

                    <p>
                        Continue where you left off, switch AI agents,
                        and build faster.
                    </p>

                </div>
            </section>

            <QuickStart />
            
            

        </div>

    );

}