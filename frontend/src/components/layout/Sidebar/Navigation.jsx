import styles from "./styles/Navigation.module.css";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../../../constants/navigation";

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        onClick={() => console.log("CLICKED:", item.path)}
                        className={({ isActive }) =>
                            `${styles.item} ${isActive ? styles.active : ""}`
                        }
                    >
                        <Icon size={18} />
                        <span>{item.label}</span>
                    </NavLink>
                );
            })}
        </nav>
    );
}