import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import TopSearches from "../components/home/TopSearches";
// import TopicOfTheDay from "../components/home/TopicOfTheDay";
import UserProfile from "../components/user/UserProfile";
import { dummyUser, dummySessions } from "./dummy-data";
import AuthComponent from "../components/home/login-register/AuthComponent";
import UserSearch from "../components/home/UserSearch";
// import PostFeed from "../components/home/post/PostFeed";
import UserRecommendations from "../components/home/UserRecommendation";

const Homepage: React.FC = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    let jwt = localStorage.getItem("token");

    // Helper function to get query parameters from URL
    const getQueryParams = (search: string) => {
        return new URLSearchParams(search);
    };

    // Extract query parameters
    const queryParams = getQueryParams(location.search);
    const query = queryParams.get("q");
    const post = queryParams.get("post") === "true";

    // Detect if the screen size is mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust the width for mobile devices
        };

        // Set initial screen size
        handleResize();

        // Add event listener for screen resize
        window.addEventListener("resize", handleResize);

        // Cleanup listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="container-fluid h-full">
            <div className="row h-full">
                {/* User Profile Card - Hidden on mobile */}
                {!isMobile && (
                    <div className="col-lg-3 mb-4">
                        {jwt ? (
                            <UserProfile
                                user={dummyUser}
                                sessions={dummySessions}
                            />
                        ) : (
                            <AuthComponent />
                        )}
                    </div>
                )}

                {/* Conditional rendering based on query */}
                <div className={isMobile ? "col-12 mb-4" : "col-lg-6 mb-4"}>
                    {location.pathname === "/search" && query ? (
                        post ? (
                            // <PostFeed query={query} /> this is the original line
                            <UserRecommendations /> // this line is added just to avoid errors for now
                        ) : (
                            <UserSearch query={query} />
                        )
                    ) : (
                        // Hiding the PostFeed component for now
                        // <PostFeed query={undefined} />
                        <UserRecommendations />
                    )}
                </div>

                {/* Trending Skills and Users - Hidden on mobile */}
                {!isMobile && (
                    <div className="col-lg-3">
                        {/* <TopicOfTheDay /> */}
                        <TopSearches />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Homepage;
