import React, { useContext } from "react";
import PostScroll from "../components/home/PostScroll";
import TrendingSkills from "../components/home/TrendingSkills";
import TrendingTutors from "../components/home/TrendingTutors";
import AuthComponent from "../components/tutor/common/AuthComponent";
import UserProfile from "../components/user/UserProfile";
import { AuthContext } from "../components/contexts/AuthContext"; // Make sure the path is correct
import { dummyUser, dummySessions } from "./dummy-data";

const Homepage: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Conditional Rendering */}
        <div className="col-lg-3 mb-4">
          {user ? (
            <UserProfile user={dummyUser} sessions={dummySessions} />
          ) : (
            <AuthComponent />
          )}
        </div>

        {/* Post Scroll Section */}
        <div className="col-lg-6 mb-4">
          <PostScroll />
        </div>

        {/* Trending Skills and Tutors */}
        <div className="col-lg-3">
          <TrendingSkills />
          <TrendingTutors />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
