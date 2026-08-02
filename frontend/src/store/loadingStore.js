import { create } from "zustand";

export const useLoadingStore = create((set) => ({

    loading: false,

    message: "Loading...",

    startLoading: (message = "Loading...") =>
        set({

            loading: true,

            message

        }),

    stopLoading: () =>
        set({

            loading: false,

            message: "Loading..."

        })

}));