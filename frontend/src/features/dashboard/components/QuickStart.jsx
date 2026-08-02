import styles from "../styles/QuickStart.module.css";

import {
    LuBrain,
    LuFileText,
    LuCode,
    LuSearch,
    LuArrowRight
} from "react-icons/lu";

import { useUIStore } from "../../../store/uiStore";

const actions = [

    {
        id: "personal",
        icon: LuBrain,
        title: "Personal",
        desc: "Daily assistance & productivity",
        color: "#8B5CF6"
    },

    {
        id: "coding",
        icon: LuCode,
        title: "Coding",
        desc: "Build, debug & review software",
        color: "#3B82F6"
    },

    {
        id: "research",
        icon: LuSearch,
        title: "Research",
        desc: "Analyze topics & gather insights",
        color: "#10B981"
    },

    {
        id: "documents",
        icon: LuFileText,
        title: "Documents",
        desc: "Analyze PDF, DOC & Notes",
        color: "#F59E0B"
    }

];

export default function QuickStart() {

    const openNewConversation = useUIStore(
        state => state.openNewConversation
    );

    const setSelectedAssistant = useUIStore(
        state => state.setSelectedAssistant
    );

    function handleClick(item) {

        setSelectedAssistant({

            id: item.id,

            title: item.title

        });

        openNewConversation();

    }

    return (

        <section className={styles.wrapper}>

            <div className={styles.header}>

                <div>

                    <h2 className={styles.heading}>
                        Quick Start
                    </h2>

                    <p className={styles.subHeading}>
                        Choose how you'd like to begin your next session.
                    </p>

                </div>

            </div>

            <div className={styles.grid}>

                {

                    actions.map((item) => {

                        const Icon = item.icon;

                        return (

                            <button

                                key={item.id}

                                className={styles.card}

                                onClick={() => handleClick(item)}

                            >

                                <div
                                    className={styles.top}
                                >

                                    <div

                                        className={styles.iconBox}

                                        style={{
                                            background: `${item.color}15`,
                                            color: item.color
                                        }}

                                    >

                                        <Icon size={30} />

                                    </div>

                                    <LuArrowRight
                                        className={styles.arrow}
                                        size={18}
                                    />

                                </div>

                                <div className={styles.content}>

                                    <h3>

                                        {item.title}

                                    </h3>

                                    <p>

                                        {item.desc}

                                    </p>

                                </div>

                            </button>

                        );

                    })

                }

            </div>

        </section>

    );

}