import PostScroll from "../components/home/PostScroll";
import TrendingSkills from "../components/home/TrendingSkills";
import TrendingTutors from "../components/home/TrendingTutors";
import UserProfile from "../components/user/UserProfile";

import { dummyUser, dummySessions } from "./dummy-data";

export default function Homepage() {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* User Profile Card */}
        <div className="col-lg-3 mb-4">
          <UserProfile user={dummyUser} sessions={dummySessions} />
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
}
