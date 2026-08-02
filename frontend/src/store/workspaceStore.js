import { create } from "zustand";

export const useWorkspaceStore = create((set) => ({

    currentWorkspace: "learning",

    setWorkspace: (workspace) =>
        set({
            currentWorkspace: workspace
        })

}));