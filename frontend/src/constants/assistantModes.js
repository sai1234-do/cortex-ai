import {
    LuBrain
} from "react-icons/lu";

import {
    FiSearch
} from "react-icons/fi";

import {
    FaCode
} from "react-icons/fa";

import {
    HiOutlineDocumentText,
    HiSparkles
} from "react-icons/hi2";

export const ASSISTANT_MODES = [

    {
        id: "personal",
        title: "Personal Assistant",
        icon: LuBrain,
        description: "Daily life, planning & ideas"
    },

    {
        id: "research",
        title: "Deep Research",
        icon: FiSearch,
        description: "Research papers & reasoning"
    },

    {
        id: "coding",
        title: "Coding",
        icon: FaCode,
        description: "Programming & debugging"
    },

    {
        id: "documents",
        title: "Documents",
        icon: HiOutlineDocumentText,
        description: "PDF, DOCX & PPT analysis"
    },

    {
        id: "creative",
        title: "Creative",
        icon: HiSparkles,
        description: "Writing, design & brainstorming"
    }

];