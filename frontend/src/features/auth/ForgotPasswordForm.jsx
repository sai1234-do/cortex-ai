import { useState } from "react";
import toast from "react-hot-toast";

import {

    forgotPassword,
    resetPassword

} from "../../services/authService";

import { useUIStore } from "../../store/uiStore";

export default function ForgotPasswordForm() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const openLogin = useUIStore(

        state => state.openLogin

    );

    async function handleSubmit() {

        if (!email.trim()) {

            toast.error("Enter email");

            return;

        }

        if (!password.trim()) {

            toast.error("Enter new password");

            return;

        }

        try {

            setLoading(true);

            await forgotPassword(email);

            await resetPassword({

                email,

                new_password: password

            });

            toast.success(

                "Password updated successfully."

            );

            openLogin();

        }

        catch (err) {

            toast.error(

                err.response?.data?.detail ||

                "Unable to reset password"

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <>

            <h2>

                Reset Password

            </h2>

            <p>

                Enter your email and choose a new password.

            </p>

            <input

                placeholder="Email"

                value={email}

                onChange={(e)=>setEmail(e.target.value)}

            />

            <input

                type="password"

                placeholder="New Password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

            />

            <button

                onClick={handleSubmit}

                disabled={loading}

            >

                {

                    loading

                    ? "Updating..."

                    : "Reset Password"

                }

            </button>

            <p>

                Remembered it?

                <span

                    onClick={openLogin}

                    style={{

                        cursor:"pointer"

                    }}

                >

                    Login

                </span>

            </p>

        </>

    );

}