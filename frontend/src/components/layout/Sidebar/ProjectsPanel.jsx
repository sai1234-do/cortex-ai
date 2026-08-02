
import { useEffect, useState } from "react";
import {
    FiFolder,
    FiPlus,
    FiCheck,
    FiX
} from "react-icons/fi";

import {
    LuPencil,
    LuTrash2
} from "react-icons/lu";

import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

import {
    getProjects,
    createProject,
    renameProject,
    deleteProject
} from "../../../services/projectService";

import {
    getConversations,
    createConversation
} from "../../../services/conversationService";
import { getMessages } from "../../../services/messageService";
import useProjectStore from "../../../store/projectStore";
import { useConversationStore } from "../../../store/conversationStore";
import useAuthStore from "../../../store/authStore";
import useGuestRestriction from "../../../hooks/useGuestRestriction";

import styles from "./styles/ProjectsPanel.module.css";

export default function ProjectsPanel() {

    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    const requireLogin = useGuestRestriction();

    const {
        projects,
        setProjects,
        selectedProject,
        setSelectedProject,
        addProject
    } = useProjectStore();

    const {
        setConversations,
        setActiveConversation
    } = useConversationStore();

    const [showInput, setShowInput] = useState(false);
    const [name, setName] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [renameValue, setRenameValue] = useState("");
    const [deleteId,setDeleteId]=useState(null)
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("guest") === "true") {
           return;
        }    
        loadProjects();
    }, [user]);

 async function loadProjects() {
      if (!user) return;
      try {

        const data = await getProjects();

        setProjects(data);
        

        if (data.length > 0) {

            await openProject(data[0]);

        }else {

          const { resetConversationState } =
               useConversationStore.getState();

          resetConversationState();

          setSelectedProject(null);

        }

      }

      catch(err){

        console.error(err);
  
      }

   }

   
  async function openProject(project) {
    if (project.guest) {

      setSelectedProject(project);

      return;

   }

    try {

        const { resetConversationState } =
            useConversationStore.getState();
        

        resetConversationState();

        setSelectedProject(project);

        let conversations = await getConversations(project.id);

        if (conversations.length === 0) {

            const created = await createConversation(project.id);

            conversations = [created];

        }

        const mapped = conversations.map(c => ({
            id: String(c.id),
            project_id: c.project_id,
            title: c.title,
            messages: []
       }));

        setConversations(mapped);

        setActiveConversation(mapped[0].id);

        navigate(`/chat/${mapped[0].id}`);

    } catch (err) {

        console.error(err);

    }

}

 async function handleCreate() {

    if (!name.trim()) return;

    // ---------- Guest ----------
    if (!user) {

        const guestProject = {

            id: "guest-" + Date.now(),

            name,

            guest: true

        };

        addProject(guestProject);

        setShowInput(false);

        setName("");

        setSelectedProject(guestProject);

        return;
    }

    // ---------- Logged user ----------

    try {

        

        const project = await createProject(name);

        addProject(project);

        setShowInput(false);

        setName("");

        const { resetConversationState } =
            useConversationStore.getState();

        resetConversationState();

        await openProject(project);

    }

    catch (err) {

        console.error(err);

    }

}

    async function handleDelete() {

    if (!deleteId) return;

    try {

        setDeleting(true);

        await deleteProject(deleteId);

        const updated = projects.filter(
            p => p.id !== deleteId
        );

        setProjects(updated);

        if (selectedProject?.id === deleteId) {

            const { resetConversationState } =
                useConversationStore.getState();

            resetConversationState();

            setSelectedProject(null);

            navigate("/dashboard");
        }

    } catch (err) {

        console.error(err);

    } finally {

        setDeleting(false);

        setDeleteId(null);

    }

}



    return (

    <>

        <div className={styles.container}>

            <div className={styles.header}>

                <span>Projects</span>

                <button
                    onClick={() => setShowInput(!showInput)}
                >
                    <FiPlus />
                </button>

            </div>

            {showInput && (

                <div className={styles.inputContainer}>

                    <input
                        value={name}
                        placeholder="Project Name"
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {

                            if (e.key === "Enter")
                                handleCreate();

                            if (e.key === "Escape") {

                                setShowInput(false);

                                setName("");

                            }

                        }}
                    />

                    <button onClick={handleCreate}>
                        <FiCheck />
                    </button>

                    <button
                        onClick={() => {

                            setShowInput(false);

                            setName("");

                        }}
                    >
                        <FiX />
                    </button>

                </div>

            )}

            <div className={styles.list}>

                {projects.length === 0 ? (

                    <div className={styles.emptyProjectState}>

                    <div className={styles.emptyProjectIcon}>
                           📁
                    </div>

                    <div className={styles.emptyProjectTitle}>
                        No projects yet
                    </div>

                    <div className={styles.emptyProjectText}>
                          Click <b>+</b> to create your first workspace.
                    </div>

            </div>

                ) : (

                    projects.map(project => (

                        <div
                            key={project.id}
                            className={`${styles.project} ${
                                selectedProject?.id === project.id
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={() => {

                                if (editingId) return;

                                openProject(project);

                            }}
                        >

                            {editingId === project.id ? (

                                <>

                                    <input
                                        autoFocus
                                        className={styles.renameInput}
                                        value={renameValue}
                                        onChange={(e) =>
                                            setRenameValue(e.target.value)
                                        }
                                    />

                                    <div className={styles.projectActions}>

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                saveRename(project);

                                            }}
                                        >
                                            <FiCheck />
                                        </button>

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                setEditingId(null);

                                            }}
                                        >
                                            <FiX />
                                        </button>

                                    </div>

                                </>

                            ) : (

                                <>

                                    <div className={styles.projectInfo}>

                                        <FiFolder />

                                        <span>{project.name}</span>

                                    </div>

                                    <div className={styles.projectActions}>

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                setEditingId(project.id);

                                                setRenameValue(project.name);

                                            }}
                                        >
                                            ✏️
                                        </button>

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                setDeleteId(project.id);

                                            }}
                                        >
                                            🗑️
                                        </button>

                                    </div>

                                </>

                            )}

                        </div>

                    ))

                )}

            </div>

        </div>

        <ConfirmDialog
            open={!!deleteId}
            title="Delete Project?"
            message="This project and all its conversations will be permanently deleted."
            confirmText="Delete"
            cancelText="Cancel"
            loading={deleting}
            onCancel={() => setDeleteId(null)}
            onConfirm={handleDelete}
        />

    </>

);
}