import { FiX } from "react-icons/fi";
import styles from "./FeaturePreviewModal.module.css";

export default function FeaturePreviewModal({

    open,

    title,

    description,

    icon,

    onClose

}) {

    if (!open) return null;

    return (

        <div
            className={styles.overlay}
            onClick={onClose}
        >

            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    <FiX size={22} />
                </button>

                {icon && (

                    <div className={styles.icon}>
                        {icon}
                    </div>

                )}

                <h2>{title}</h2>

                <p>{description}</p>

                <span className={styles.badge}>
                    Coming Soon
                </span>

            </div>

        </div>

    );

}