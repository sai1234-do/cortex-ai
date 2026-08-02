import { useState } from "react";

import { useUIStore } from "../../store/uiStore";
import useProjectStore from "../../store/projectStore";

import { createProject } from "../../services/projectService";

import { useLoadingStore } from "../../store/loadingStore";

import styles from "./styles/CreateProjectModal.module.css";

export default function CreateProjectModal() {

    const [name, setName] = useState("");

    const show = useUIStore(
        state => state.showCreateProject
    );

    const close = useUIStore(
        state => state.closeCreateProject
    );

    const addProject = useProjectStore(
        state => state.addProject
    );

    const {

        startLoading,

        stopLoading

    } = useLoadingStore();

    if (!show) return null;

    async function handleCreate() {

        if (!name.trim()) return;

        try {

            startLoading("Creating Project...");

            const project = await createProject(name);

            addProject(project);

            close();

            setName("");

        } catch (err) {

            console.error(err);

        } finally {

            stopLoading();

        }

    }

    return (

        <div className={styles.overlay}>

            <div className={styles.modal}>

                <h2>Create Project</h2>

                <p>
                    Create your first project to organize conversations.
                </p>

                <input

                    placeholder="Project Name"

                    value={name}

                    onChange={(e) =>
                        setName(e.target.value)
                    }

                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            handleCreate();

                        }

                    }}

                />

                <div className={styles.actions}>

                    <button
                        onClick={close}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                    >
                        Create
                    </button>

                </div>

            </div>

        </div>

    );

}