import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BasicInfo } from "../components/tutor/profile/BasicInfo";
import { Education } from "../components/tutor/profile/Education";
import { SkillsExperience } from "../components/tutor/profile/SkillExperience";
import { Tutor, tutorApi } from "../api/tutor";
import { Loader } from "lucide-react";

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
        console.log(response);
        if (response) {
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

  if (error) {
    return <NotFound />;
  }

  if (!tutor) {
    return <NotFound />;
  }

  return (
    <div className="max-w-3xl flex gap-x-8 mx-auto">
      {/* Left side: Tutor Profile */}
      <div className="w-full">
        <BasicInfo tutor={tutor} />
        <SkillsExperience tutor={tutor} />
        <Education education={tutor.formalEducation} />
      </div>

      {/* Right side: Calendar */}
      {/* <div className="shadow-md h-max">
        <Calendar availability={tutor.availability} />
      </div> */}
    </div>
  );
};

export default TutorProfile;
