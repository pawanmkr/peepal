import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import Homepage from "../pages/Homepage";
import TutorProfile from "../pages/TutorProfile";
import TutorSearch from "../pages/TutorSearch";

export function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Limit width and center content */}
      <div className="flex-grow overflow-y-auto pt-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          {" "}
          {/* Added container */}
          <Routes>
            <Route path="/home" element={<Homepage />} />
            <Route path="/tutor" element={<TutorProfile />} />
            <Route path="/tutor/search" element={<TutorSearch />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
