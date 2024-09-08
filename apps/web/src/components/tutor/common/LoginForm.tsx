import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authContext) {
      setErrorMessage("Auth context is not available");
      return;
    }

    const { login } = authContext;

    // Simulating login logic with status code handling
    const testEmail = "test@example.com";
    const testPassword = "password123";

    if (!email || !password) {
      setErrorMessage("400 - Please fill in all fields.");
      return;
    }

    if (email === testEmail && password === testPassword) {
      setErrorMessage(""); // clear previous errors
      login({ email, name: "Test User" });
      console.log("200 - Login successful");
    } else if (email !== testEmail) {
      setErrorMessage("404 - User not found.");
    } else {
      setErrorMessage("400 - Bad request.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
