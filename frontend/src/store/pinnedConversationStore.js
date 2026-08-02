import { create } from "zustand";

const saved =
    JSON.parse(
        localStorage.getItem("cortex-pinned") || "[]"
    );

export const usePinnedConversationStore = create((set) => ({

    pinnedIds: saved,

    togglePin: (id) =>
        set((state) => {

            const exists = state.pinnedIds.includes(String(id));

            const updated = exists
                ? state.pinnedIds.filter(
                      x => x !== String(id)
                  )
                : [
                      ...state.pinnedIds,
                      String(id)
                  ];

            localStorage.setItem(
                "cortex-pinned",
                JSON.stringify(updated)
            );

            return {
                pinnedIds: updated
            };

        })

}));