import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

import CalendarView from "../components/user/profile/CalendarView";
import { BasicInfo } from "../components/user/profile/BasicInfo";
import { Education } from "../components/user/profile/Education";
import { SkillsExperience } from "../components/user/profile/SkillExperience";
import { User, userApi } from "../api/user";
import { slots } from "./dummy-data";
import { Reviews } from "../components/user/profile/Reviews";
// import PostFeed from "../components/home/post/PostFeed";
import VideoSection from "../components/home/post/VideoSection";

// Simple 404 page component
const NotFound: React.FC = () => (
    <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">404 - User Not Found</h1>
    </div>
);

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [showPosts, setShowPosts] = useState<boolean>(false);
    const [showDemoVideo, setShowDemoVideo] = useState<boolean>(false);

    useEffect(() => {
        if (!id) {
            setError(true); // No id provided
            setLoading(false);
            return;
        }

        // Fetch user data
        const fetchTutor = async () => {
            try {
                const response = await userApi.getUserById(id);
                if (response) {
                    response.demoVideo =
                        "https://www.youtube.com/embed/lyPy_JPaCFs?si=p1VCkuG7ryeJkOmN";
                    setUser(response);
                    setError(false);
                } else {
                    setError(true); // User not found
                }
            } catch (err) {
                console.error(err);
                setError(true); // Error fetching user data
            } finally {
                setLoading(false);
            }
        };

        fetchTutor();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="animate-spin" size={24} />
            </div>
        );
    }

    if (error) return <NotFound />;
    if (!user) return <NotFound />;

    return (
        <div className="max-w-7xl flex gap-x-4 mx-auto mb-32">
            {/* Left side: User Profile */}
            <div className="w-full flex flex-col gap-y-6">
                <BasicInfo
                    user={user}
                    showPosts={showPosts}
                    setShowPosts={setShowPosts}
                    showDemoVideo={showDemoVideo}
                    setShowDemoVideo={setShowDemoVideo}
                />
                {/* Video Section: Conditional rendering */}
                {showDemoVideo && (
                    <div className="bg-white shadow-md rounded-lg p-2 h-fit w-fit">
                        <VideoSection
                            videoUrl={user.demoVideo}
                            height="486px"
                            width="864px"
                            autoPlay={true}
                            rounded={true}
                        />
                    </div>
                )}
                <SkillsExperience user={user} />
                {/* <Education education={user.formalEducation} /> Formal Education removed */}
                <Reviews userId={user.id} />
            </div>

            {/* Posts by User on Toggle */}
            {/* Right side: Calendar */}
            {/* {showPosts ? (
                // <PostFeed query={undefined} userId={id} />
                <CalendarView slots={slots} />
            ) : (
                <CalendarView slots={slots} />
            )} */}
        </div>
    );
};

export default UserProfile;
