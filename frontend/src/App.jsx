import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import AppRoutes from "./routes/AppRoutes";

import AuthModal from "./features/auth/AuthModal";
import CreateProjectModal from "./features/project/CreateProjectModal";

import GuestRestrictionModal from "./components/common/GuestRestrictionModal/GuestRestrictionModal";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import GlobalLoader from "./components/common/GlobalLoader/GlobalLoader";

import { useThemeStore } from "./store/themeStore";

function AppContent() {

    const location = useLocation();

    const isWelcome = location.pathname === "/";

    return (

        <>

            {isWelcome ? (

                <AppRoutes />

            ) : (

                <AppLayout>

                    <AppRoutes />

                </AppLayout>

            )}

            {/* Global Modals */}

            <AuthModal />

            <GuestRestrictionModal />

            <CreateProjectModal />

        </>

    );

}

export default function App() {

    const theme = useThemeStore(
        state => state.theme
    );

    useEffect(() => {

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

    }, [theme]);

    return (

        <ErrorBoundary>

            <AppContent />
            <Toaster
               position="top-right"
               reverseOrder={false}
               toastOptions={{
               duration: 3000,

               style: {

                 background: "#1f2937",

                 color: "#fff",

                 borderRadius: "12px",

                  padding: "14px 18px",

                  fontSize: "14px"

              },

             success: {

              iconTheme: {

                primary: "#22c55e",

                secondary: "#fff"

              }

            },

        error: {

            iconTheme: {

                primary: "#ef4444",

                secondary: "#fff"

            }

        }

    }}
/>
        <GlobalLoader /> 

        </ErrorBoundary>

    );

}