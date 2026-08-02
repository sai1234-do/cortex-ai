import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authService";

import useAuthStore from "../../store/authStore";
import { useUIStore } from "../../store/uiStore";
import toast from "react-hot-toast";

export default function SignupForm() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginStore = useAuthStore(
        state => state.login
    );

    const closeAuth = useUIStore(
        state => state.closeAuthModal
    );

    const openLogin = useUIStore(
        state => state.openLogin
    );

    async function handleSignup() {

        try {

            const data = await signup({

                name,

                email,

                password

            });
             localStorage.removeItem("guest");
            loginStore(

                data.user,

                data.access_token

            );

            closeAuth();

            navigate("/dashboard");

        }

        catch (err) {

            console.error(err);

            toast.error(

                err.response?.data?.detail ||

                err.message ||

                "Signup failed"

            );

        }

    }

    return (

        <>

            <h2>Create Account</h2>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

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

            <button onClick={handleSignup}>

                Signup

            </button>

            <p>

                Already have an account?

                <span onClick={openLogin}>

                    Login

                </span>

            </p>

        </>

    );

}