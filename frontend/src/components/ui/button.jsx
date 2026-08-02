import "./Button.css";

export default function Button({

    children,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    icon = null,
    onClick

}) {

    return (

        <button

            className={`btn ${variant} ${size}`}

            disabled={disabled || loading}

            onClick={onClick}

        >

            {loading &&

                <span className="loader-small"></span>

            }

            {!loading && icon}

            <span>{children}</span>

        </button>

    );

}