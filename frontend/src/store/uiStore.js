import { create } from "zustand";

export const useUIStore = create((set) => ({

    /* =========================================
       AUTH
    ========================================= */

    showAuthModal: false,

    authMode: "login",

    openLogin: () =>
        set({
            showAuthModal: true,
            authMode: "login"
        }),

    openSignup: () =>
        set({
            showAuthModal: true,
            authMode: "signup"
        }),

    closeAuthModal: () =>
        set({
            showAuthModal: false
        }),

    setAuthMode: (mode) =>
        set({
            authMode: mode
        }),
    openForgotPassword: () =>
      set({
        showAuthModal: true,
        authMode: "forgot"
      }),

    /* =========================================
       NEW CONVERSATION
    ========================================= */

    showNewConversation: false,

    openNewConversation: () =>
        set({
            showNewConversation: true
        }),

    closeNewConversation: () =>
        set({
            showNewConversation: false
        }),

    /* =========================================
       CREATE PROJECT
    ========================================= */

    showCreateProject: false,

    openCreateProject: () =>
        set({
            showCreateProject: true
        }),

    closeCreateProject: () =>
        set({
            showCreateProject: false
        }),

    /* =========================================
       HELP
    ========================================= */

    showHelp: false,

    openHelp: () =>
        set({
            showHelp: true
        }),

    closeHelp: () =>
        set({
            showHelp: false
        }),

    /* =========================================
       ASSISTANT
    ========================================= */

    selectedAssistant: null,

    setSelectedAssistant: (assistant) =>
        set({
            selectedAssistant: assistant
        }),
    
    /* =========================================
   GUEST RESTRICTION
========================================= */

  showGuestRestriction: false,

  guestFeature: null,

  openGuestRestriction: (feature) =>
    set({
        showGuestRestriction: true,
        guestFeature: feature
    }),

  closeGuestRestriction: () =>
    set({
        showGuestRestriction: false,
        guestFeature: null
    }),
    /* =========================================
       FILE UPLOADS
    ========================================= */

    uploadedFiles: [],

    addUploadedFile: (file) =>
        set((state) => ({
            uploadedFiles: [
                ...state.uploadedFiles,
                file
            ]
        })),

    removeUploadedFile: (id) =>
        set((state) => ({
            uploadedFiles: state.uploadedFiles.filter(
                file => file.id !== id
            )
        })),

    clearUploadedFiles: () =>
        set({
            uploadedFiles: []
        })

}));