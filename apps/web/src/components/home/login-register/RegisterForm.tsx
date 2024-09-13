import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { checkUsername, registerUser } from "../../../api/auth";

const RegisterForm: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
        null
    );
    const [usernameChecking, setUsernameChecking] = useState(false);

    useEffect(() => {
        if (username.length >= 3) {
            setUsernameChecking(true);
            const timer = setTimeout(() => {
                checkIfUsernameAvailable();
            }, 500); // Debounce to prevent excessive API calls

            return () => clearTimeout(timer); // Cleanup the timer on component unmount or when username changes
        } else {
            setUsernameAvailable(null);
            setUsernameChecking(false);
        }
    }, [username]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            setLoading(false);
            return;
        }

        const errorMessage = await registerUser({
            firstName,
            lastName,
            username,
            email,
            password,
        });

        if (errorMessage && errorMessage.length > 0) {
            setErrorMessage(errorMessage);
        }
        setLoading(false);
    };

    const checkIfUsernameAvailable = async () => {
        try {
            const available = await checkUsername(username);
            setUsernameAvailable(available);
        } catch (err) {
            setErrorMessage(
                "An error occurred while checking username availability."
            );
        } finally {
            setUsernameChecking(false);
        }
    };

    return (
        <form
            onSubmit={handleRegister}
            className="bg-white p-6 rounded-lg shadow-md border-1 border-gray-300"
        >
            <h2 className="text-blue-600 font-extrabold mb-4">
                Create New Account
            </h2>

            {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
            )}

            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />

            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {usernameChecking && (
                    <Loader
                        className="animate-spin absolute right-3 top-3"
                        size={20}
                    />
                )}
                {usernameAvailable === false && !usernameChecking && (
                    <p className="text-red-700 ml-2 text-sm mt-1">
                        Username is already taken!
                    </p>
                )}
                {usernameAvailable === true && !usernameChecking && (
                    <p className="text-green-700 ml-2 text-sm mt-1">
                        Username is available!
                    </p>
                )}
            </div>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
                {loading ? (
                    <Loader className="animate-spin" size={16} />
                ) : (
                    "Register"
                )}
            </button>
        </form>
    );
};

export default RegisterForm;
