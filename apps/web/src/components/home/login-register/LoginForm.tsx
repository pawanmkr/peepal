import React, { useState } from "react";
import { Loader } from "lucide-react";

import { loginUser } from "../../../api/auth";

const LoginForm: React.FC = () => {
    const [emailUsername, setEmailUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const error = await loginUser({
                emailUsername,
                password,
            });
            if (error) {
                setErrorMessage(error);
            }
        } catch (err) {
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="p-6 rounded-lg bg-white border-1 border-gray-300 shadow-md"
        >
            <h2 className="text-blue-600 font-extrabold mb-4">Login</h2>
            {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <div className="mb-4">
                <input
                    type="text"
                    id="email_username"
                    placeholder="Email or Username"
                    value={emailUsername}
                    onChange={(e) => setEmailUsername(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md flex justify-center items-center hover:bg-blue-700 transition-colors"
                disabled={loading}
            >
                {loading ? (
                    <Loader className="animate-spin" size={24} />
                ) : (
                    "Login"
                )}
            </button>
        </form>
    );
};

export default LoginForm;
