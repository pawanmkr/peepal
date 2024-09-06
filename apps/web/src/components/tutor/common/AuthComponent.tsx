import React, { useState } from "react";
import LoginForm from "../common/LoginForm"; // Adjust path as necessary
import RegisterForm from "../common/RegisterForm"; // Adjust path as necessary

const AuthComponent: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Auth Forms */}
      <div className="px-6 py-6">
        {/* <h2 className="text-2xl font-bold text-center mb-6">
          {showLogin ? "Login" : "Register"}
        </h2> */}

        {showLogin ? (
          <>
            <LoginForm />
            <p className="mt-4 text-center">
              Don’t have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setShowLogin(false)}
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm />
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setShowLogin(true)}
              >
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthComponent;
