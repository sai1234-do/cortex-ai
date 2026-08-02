import { create } from "zustand";

const useAgentStore = create((set) => ({
    selectedAgent: "personal",

    setSelectedAgent: (agent) =>
        set({ selectedAgent: agent }),
}));

export default useAgentStore;