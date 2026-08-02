import styles from "./styles/ConversationTypeCard.module.css";

export default function ConversationTypeCard({

    assistant,

    selected,

    onClick,

}) {

    const Icon = assistant.icon;

    return (

        <div

            className={`${styles.card} ${
                selected ? styles.selected : ""
            }`}

            onClick={onClick}

        >

            <div className={styles.icon}>

                <Icon size={26} />

            </div>

            <div className={styles.content}>

                <h3>

                    {assistant.title}

                </h3>

                <p>

                    {assistant.description}

                </p>

            </div>

        </div>

    );

}