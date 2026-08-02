import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";

import useAuthStore from "../../store/authStore";
import { useUIStore } from "../../store/uiStore";
import { getProjects } from "../../services/projectService";
import useProjectStore from "../../store/projectStore";
import { useConversationStore } from "../../store/conversationStore";

import toast from "react-hot-toast";

export default function LoginForm() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginStore = useAuthStore(
        state => state.login
    );

    const closeAuth = useUIStore(
        state => state.closeAuthModal
    );

    const openSignup = useUIStore(
        state => state.openSignup
    );

    const openForgotPassword = useUIStore(
        state => state.openForgotPassword
    );

    const setProjects = useProjectStore(
        state => state.setProjects
    );

    const setSelectedProject = useProjectStore(
        state => state.setSelectedProject
    );

    async function handleLogin() {

        try {

            const data = await login({

                email,

                password

            });

            localStorage.removeItem("guest");

            loginStore(

                data.user,

                data.access_token

            );

            useConversationStore.setState({

                conversations: [],

                activeConversationId: null,

                isStreaming: false

            });

            const projects = await getProjects();

            setProjects(projects);

            if (projects.length > 0) {

                setSelectedProject(projects[0]);

            }

            closeAuth();

            navigate("/dashboard");

        }

        catch (err) {

            console.error(err);

            toast.error(

                err.response?.data?.detail ||

                err.message ||

                "Login failed"

            );

        }

    }

    return (

        <>

            <h2>Login</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div
                style={{
                    textAlign: "right",
                    marginBottom: "12px"
                }}
            >
                <span
                    style={{
                        cursor: "pointer",
                        color: "#3b82f6",
                        fontSize: "13px"
                    }}
                    onClick={openForgotPassword}
                >
                    Forgot Password?
                </span>
            </div>

            <button onClick={handleLogin}>

                Login

            </button>

            <p>

                Don't have an account?{" "}

                <span
                    onClick={openSignup}
                    style={{
                        cursor: "pointer"
                    }}
                >

                    Signup

                </span>

            </p>

        </>

    );

}