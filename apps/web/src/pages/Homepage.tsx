import PostScroll from "../components/home/post/PostScroll";
import TopSearches from "../components/home/TopSearches";
import SkillOfTheDay from "../components/home/TopicOfTheDay";
import UserProfile from "../components/user/UserProfile";

import { posts } from "../components/home/post/dummy-data";
import { dummyUser, dummySessions } from "./dummy-data";

export default function Homepage() {
  return (
    <div className="container-fluid h-full">
      <div className="row h-full">
        {/* User Profile Card - Fixed Position */}
        <div className="col-lg-3 mb-4">
          <UserProfile user={dummyUser} sessions={dummySessions} />
        </div>

        {/* Post Scroll Section - Scrollable */}
        <div className="col-lg-6 mb-4">
          <PostScroll posts={posts} />
        </div>

        {/* Trending Skills and Tutors - Fixed Position */}
        <div className="col-lg-3">
          <SkillOfTheDay />
          <TopSearches />
        </div>
      </div>
    </div>
  );
}
