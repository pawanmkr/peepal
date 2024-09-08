import React, { useState, useContext } from "react";
import { Loader } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!authContext) {
      setErrorMessage("Auth context is not available");
      setLoading(false);
      return;
    }

    // Simulate login logic with a 2-second delay
    setTimeout(() => {
      authContext.login({ email, name: "Test User" });
      setLoading(false);
    }, 2000);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="p-6 rounded-lg bg-white border-2 border-gray-300 shadow-md"
    >
      <h2 className="text-blue-600 font-extrabold mb-4">Login</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div className="mb-4">
        <input
          type="text"
          id="email_username"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        {loading ? <Loader className="animate-spin" size={24} /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
