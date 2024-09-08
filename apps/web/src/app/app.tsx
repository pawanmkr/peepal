import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import TutorProfile from "../pages/TutorProfile";
import TutorSearch from "../pages/TutorSearch";
import Landing from "../pages/Landing";
import Layout from "../components/layout/Layout";
import { AuthProvider } from "../components/contexts/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Landing Page without header and full width */}
        <Route path="/" element={<Landing />} />

        {/* Routes with header and limited width */}
        <Route
          path="/home"
          element={
            <Layout>
              <Homepage />
            </Layout>
          }
        />
        <Route
          path="/tutor"
          element={
            <Layout>
              <TutorProfile />
            </Layout>
          }
        />
        <Route
          path="/tutor/search"
          element={
            <Layout>
              <TutorSearch />
            </Layout>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
