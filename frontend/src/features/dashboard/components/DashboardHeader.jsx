import  useAuthStore  from "../../../store/authStore";
import styles from "../styles/DashboardHeader.module.css";

export default function DashboardHeader() {

    const user = useAuthStore((state) => state.user);

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    return (

        <section className={styles.header}>

            <div>

                <h1>

                    {greeting}, {user.name} 👋

                </h1>

                <p>

                    Welcome back to your Personal Cognitive Operating System.

                </p>

            </div>

        </section>

    );

}