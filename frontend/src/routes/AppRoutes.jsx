import { Routes, Route } from "react-router-dom";

import Welcome from "../pages/Welcome";
import Dashboard from "../features/dashboard/Dashboard";
import Chat from "../pages/Chat";
import Settings from "../features/settings/Settings";

import ChatGuard from "../components/ChatGuard";

export default function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Welcome />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/chat/:id"
                element={
                    <ChatGuard>
                        <Chat />
                    </ChatGuard>
                }
            />

            <Route
                path="/settings"
                element={<Settings />}
            />

        </Routes>

    );

}