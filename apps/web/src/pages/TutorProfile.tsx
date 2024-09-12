import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

import CalendarView from "../components/tutor/profile/CalendarView";
import { BasicInfo } from "../components/tutor/profile/BasicInfo";
import { Education } from "../components/tutor/profile/Education";
import { SkillsExperience } from "../components/tutor/profile/SkillExperience";
import { Tutor, tutorApi } from "../api/tutor";
import { slots } from "./dummy-data";
import { Reviews } from "../components/tutor/profile/Reviews";
import PostFeed from "../components/home/post/PostFeed";
import VideoSection from "../components/home/post/VideoSection";

// Simple 404 page component
const NotFound: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-4xl font-bold">404 - Tutor Not Found</h1>
  </div>
);

const TutorProfile: React.FC = () => {
  const [tutor, setTutor] = useState<Tutor | null>(null);
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

    // Fetch tutor data
    const fetchTutor = async () => {
      try {
        const response = await tutorApi.getTutorById(id);
        if (response) {
          response.video =
            "https://www.youtube.com/embed/lyPy_JPaCFs?si=p1VCkuG7ryeJkOmN";
          setTutor(response);
          setError(false);
        } else {
          setError(true); // Tutor not found
        }
      } catch (err) {
        console.error(err);
        setError(true); // Error fetching tutor data
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
  if (!tutor) return <NotFound />;

  return (
    <div className="w-full flex gap-x-4 mx-auto mb-32">
      {/* Left side: Tutor Profile */}
      <div className="w-full flex flex-col gap-y-6">
        <BasicInfo
          tutor={tutor}
          showPosts={showPosts}
          setShowPosts={setShowPosts}
          showDemoVideo={showDemoVideo}
          setShowDemoVideo={setShowDemoVideo}
        />
        {/* Video Section: Conditional rendering */}
        {showDemoVideo && (
          <div className="bg-white shadow-md rounded-lg p-2 h-fit w-fit">
            <VideoSection
              videoUrl={tutor.video}
              height="486px"
              width="864px"
              autoPlay={true}
            />
          </div>
        )}
        <SkillsExperience tutor={tutor} />
        <Education education={tutor.formalEducation} />
        <Reviews />
      </div>

      {/* Posts by Tutor on Toggle */}
      {/* Right side: Calendar */}
      {showPosts ? (
        <PostFeed query={undefined} tutorId={id} />
      ) : (
        <CalendarView slots={slots} />
      )}
    </div>
  );
};

export default TutorProfile;
