import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import TopSearches from "../components/home/TopSearches";
import SkillOfTheDay from "../components/home/TopicOfTheDay";
import UserProfile from "../components/user/UserProfile";
import { dummyUser, dummySessions } from "./dummy-data";
import AuthComponent from "../components/home/login-register/AuthComponent";
import TutorSearch from "../components/home/TutorSearch";
import PostFeed from "../components/home/post/PostFeed";

const Homepage: React.FC = () => {
  const location = useLocation();
  let jwt = localStorage.getItem("token");

  // Helper function to get query parameters from URL
  const getQueryParams = (search: string) => {
    return new URLSearchParams(search);
  };

  // Extract query parameters
  const queryParams = getQueryParams(location.search);
  const query = queryParams.get("q");
  const post = queryParams.get("post") === "true";

  return (
    <div className="container-fluid h-full">
      <div className="row h-full">
        {/* User Profile Card */}
        <div className="col-lg-3 mb-4">
          {jwt ? (
            <UserProfile user={dummyUser} sessions={dummySessions} />
          ) : (
            <AuthComponent />
          )}
        </div>

        {/* Conditional rendering based on query */}
        <div className="col-lg-6 mb-4">
          {location.pathname === "/search" && query ? (
            post ? (
              <PostFeed query={query} />
            ) : (
              <TutorSearch query={query} />
            )
          ) : (
            <PostFeed query={undefined} />
          )}
        </div>

        {/* Trending Skills and Tutors */}
        <div className="col-lg-3">
          <SkillOfTheDay />
          <TopSearches />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
