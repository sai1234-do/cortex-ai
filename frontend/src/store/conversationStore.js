import { create } from "zustand";


export const useConversationStore = create((set) => ({

            conversations: [],
            activeConversationId: null,
            isStreaming: false,

            /* ---------------- Conversations ---------------- */

            setConversations: (incoming) =>
                set({
                    conversations: incoming
                }),

            addConversation: (conversation) =>
                set((state) => {

                    const exists = state.conversations.find(
                        c => String(c.id) === String(conversation.id)
                    );

                    if (exists) {
                        return {
                            activeConversationId: String(conversation.id)
                        };
                    }

                    return {

                        conversations: [
                            {
                                ...conversation,
                                messages: conversation.messages || []
                            },
                            ...state.conversations
                        ],

                        activeConversationId: String(conversation.id)

                    };

                }),

            setActiveConversation: (id) =>
                set({
                    activeConversationId:
                        id === null ? null : String(id)
                }),

            renameConversation: (id, title) =>
                set((state) => ({

                    conversations: state.conversations.map(c =>
                        String(c.id) === String(id)
                            ? {
                                  ...c,
                                  title
                              }
                            : c
                    )

                })),

            deleteConversation: (id) =>
                set((state) => {

                    const updated = state.conversations.filter(
                        c => String(c.id) !== String(id)
                    );

                    return {

                        conversations: updated,

                        activeConversationId:
                            state.activeConversationId === String(id)
                                ? (
                                      updated.length
                                          ? String(updated[0].id)
                                          : null
                                  )
                                : state.activeConversationId

                    };

                }),

            /* -------- NEW -------- */

            resetConversationState: () =>
                set({

                    conversations: [],

                    activeConversationId: null,

                    isStreaming: false

                }),

            /* ---------------- Messages ---------------- */

            addMessage: (conversationId, message) =>
                set((state) => ({

                    conversations: state.conversations.map(c =>
                        String(c.id) === String(conversationId)
                            ? {
                                  ...c,
                                  messages: [
                                      ...(c.messages || []),
                                      message
                                  ]
                              }
                            : c
                    )

                })),

            startAssistantResponse: (conversationId) =>
                set((state) => ({

                    isStreaming: true,

                    conversations: state.conversations.map(c => {

                        if (String(c.id) !== String(conversationId))
                            return c;

                        return {

                            ...c,

                            messages: [

                                ...(c.messages || []),

                                {
                                    role: "assistant",
                                    content: "",
                                    thinking: true,
                                    streaming: true
                                }

                            ]

                        };

                    })

                })),

            appendAssistantChunk: (conversationId, chunk) =>
                set((state) => ({

                    conversations: state.conversations.map(c => {

                        if (String(c.id) !== String(conversationId))
                            return c;

                        const messages = [...(c.messages || [])];

                        if (!messages.length)
                            return c;

                        const last = messages[messages.length - 1];

                        messages[messages.length - 1] = {

                            ...last,

                            content: (last.content || "") + chunk,

                            thinking: false,

                            streaming: true

                        };

                        return {
                            ...c,
                            messages
                        };

                    })

                })),

            finishAssistantResponse: (conversationId) =>
                set((state) => ({

                    isStreaming: false,

                    conversations: state.conversations.map(c => {

                        if (String(c.id) !== String(conversationId))
                            return c;

                        const messages = [...(c.messages || [])];

                        if (!messages.length)
                            return c;

                        messages[messages.length - 1] = {

                            ...messages[messages.length - 1],

                            thinking: false,

                            streaming: false

                        };

                        return {
                            ...c,
                            messages
                        };

                    })

                }))

        }),

        {
            name: "cortex-conversations"
        }

    
);
