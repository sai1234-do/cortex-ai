import styles from "./styles/WorkspaceSwitcher.module.css";

import { FiChevronDown, FiSearch } from "react-icons/fi";
import { LuBrain } from "react-icons/lu";
import { FaCode } from "react-icons/fa";
import {
    HiOutlineDocumentText,
    HiSparkles
} from "react-icons/hi2";

import { useParams } from "react-router-dom";

import { useConversationStore } from "../../../store/conversationStore";

const WORKSPACES = {

    personal: {
        name: "Personal",
        icon: LuBrain
    },

    research: {
        name: "Research",
        icon: FiSearch
    },

    coding: {
        name: "Coding",
        icon: FaCode
    },

    documents: {
        name: "Documents",
        icon: HiOutlineDocumentText
    },

    creative: {
        name: "Creative",
        icon: HiSparkles
    }

};

export default function WorkspaceSwitcher() {

    const activeConversationId = useConversationStore(
       (state) => state.activeConversationId
   );

   const conversation = useConversationStore((state) =>
      state.conversations.find(
         (c) => c.id === activeConversationId
      )
   );

    const assistant = conversation?.assistant;

    const workspace =
        WORKSPACES[assistant?.id || "personal"];

    const Icon = workspace.icon;

    return (

        <button className={styles.switcher}>

            <div className={styles.left}>

                <div className={styles.iconBox}>

                    <Icon size={18} />

                </div>

                <div>

                    <span className={styles.label}>
                        Workspace
                    </span>

                    <h3 className={styles.name}>
                        {workspace.name}
                    </h3>

                </div>

            </div>

            <FiChevronDown size={18} />

        </button>

    );
     

}