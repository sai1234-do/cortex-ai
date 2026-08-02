import styles from "./ConfirmDialog.module.css";

export default function ConfirmDialog({

    open,

    title,

    message,

    confirmText = "Delete",

    cancelText = "Cancel",

    onConfirm,

    onCancel,

    loading = false

}) {

    if (!open) return null;

    return (

        <div
            className={styles.overlay}
            onClick={onCancel}
        >

            <div
                className={styles.dialog}
                onClick={(e) => e.stopPropagation()}
            >

                <h3>{title}</h3>

                <p>{message}</p>

                <div className={styles.buttons}>

                    <button
                        className={styles.cancel}
                        onClick={onCancel}
                        disabled={loading}
                    >

                        {cancelText}

                    </button>

                    <button
                        className={styles.delete}
                        onClick={onConfirm}
                        disabled={loading}
                    >

                        {loading
                            ? "Deleting..."
                            : confirmText}

                    </button>

                </div>

            </div>

        </div>

    );

}