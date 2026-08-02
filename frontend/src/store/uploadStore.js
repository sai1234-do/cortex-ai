import { create } from "zustand";

const useUploadStore = create((set) => ({

    attachments: [],

    addAttachment: (file) =>
        set((state) => ({
            attachments: [...state.attachments, file],
        })),

    removeAttachment: (index) =>
        set((state) => ({
            attachments: state.attachments.filter(
                (_, i) => i !== index
            ),
        })),

    clearAttachments: () =>
        set({
            attachments: [],
        }),

}));

export default useUploadStore;