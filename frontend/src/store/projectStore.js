import { create } from "zustand";

const useProjectStore = create((set) => ({

    projects: [],

    selectedProject: null,

    setProjects: (projects) =>
        set({
            projects
        }),

    setSelectedProject: (project) =>
        set({
            selectedProject: project
        }),

    addProject: (project) =>
        set((state) => ({
            projects: [project, ...state.projects],
            selectedProject: project
        })),

    updateProject: (project) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === project.id ? project : p
            )
        })),

    removeProject: (id) =>
        set((state) => ({

            projects: state.projects.filter(
                (p) => p.id !== id
            ),

            selectedProject:
                state.selectedProject?.id === id
                    ? null
                    : state.selectedProject

        }))

}));

export default useProjectStore;