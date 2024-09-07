import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import TutorProfile from "../pages/TutorProfile";
import TutorSearch from "../pages/TutorSearch";
import Landing from "../components/home/Landing";
import Layout from "../components/layout/Layout";

export function App() {
  return (
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
  );
}

export default App;
