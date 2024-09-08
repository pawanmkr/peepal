import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthComponent: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  return (
    <div className="max-w-sm mx-auto rounded-lg overflow-hidden">
      {/* Auth Forms */}
      <div className="">
        {/* <h2 className="text-2xl font-bold text-center mb-6">
          {showLogin ? "Login" : "Register"}
        </h2> */}

        {showLogin ? (
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
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AuthComponent;
