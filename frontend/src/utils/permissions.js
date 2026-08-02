export const GUEST_BLOCKED = {
    upload: {
        title: "Upload Files",
        description:
            "Uploading files requires a Cortex account."
    },

    share: {
        title: "Share Conversations",
        description:
            "Sharing conversations requires a Cortex account."
    },

    memory: {
        title: "Long-Term Memory",
        description:
            "Memory is available only for registered users."
    },

    export: {
        title: "Export Chats",
        description:
            "Exporting conversations requires a Cortex account."
    }
};

export function canUse(user) {
    return !!user;
}