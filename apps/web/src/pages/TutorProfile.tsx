import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

import CalendarView from "../components/professional/profile/CalendarView";
import { BasicInfo } from "../components/professional/profile/BasicInfo";
import { Education } from "../components/professional/profile/Education";
import { SkillsExperience } from "../components/professional/profile/SkillExperience";
import { Professional, professionalApi } from "../api/professional";
import { slots } from "./dummy-data";
import { Reviews } from "../components/professional/profile/Reviews";
import PostFeed from "../components/home/post/PostFeed";
import VideoSection from "../components/home/post/VideoSection";

// Simple 404 page component
const NotFound: React.FC = () => (
    <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">404 - Professional Not Found</h1>
    </div>
);

const TutorProfile: React.FC = () => {
    const [professional, setProfessional] = useState<Professional | null>(null);
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

        // Fetch professional data
        const fetchTutor = async () => {
            try {
                const response = await professionalApi.getProfessionalById(id);
                if (response) {
                    response.video =
                        "https://www.youtube.com/embed/lyPy_JPaCFs?si=p1VCkuG7ryeJkOmN";
                    setProfessional(response);
                    setError(false);
                } else {
                    setError(true); // Professional not found
                }
            } catch (err) {
                console.error(err);
                setError(true); // Error fetching professional data
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
    if (!professional) return <NotFound />;

    return (
        <div className="max-w-7xl flex gap-x-4 mx-auto mb-32">
            {/* Left side: Professional Profile */}
            <div className="w-full flex flex-col gap-y-6">
                <BasicInfo
                    professional={professional}
                    showPosts={showPosts}
                    setShowPosts={setShowPosts}
                    showDemoVideo={showDemoVideo}
                    setShowDemoVideo={setShowDemoVideo}
                />
                {/* Video Section: Conditional rendering */}
                {showDemoVideo && (
                    <div className="bg-white shadow-md rounded-lg p-2 h-fit w-fit">
                        <VideoSection
                            videoUrl={professional.video}
                            height="486px"
                            width="864px"
                            autoPlay={true}
                            rounded={true}
                        />
                    </div>
                )}
                <SkillsExperience professional={professional} />
                <Education education={professional.formalEducation} />
                <Reviews professionalId={professional.id} />
            </div>

            {/* Posts by Professional on Toggle */}
            {/* Right side: Calendar */}
            {showPosts ? (
                <PostFeed query={undefined} professionalId={id} />
            ) : (
                <CalendarView slots={slots} />
            )}
        </div>
    );
};

export default TutorProfile;
