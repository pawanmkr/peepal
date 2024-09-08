import React from "react";
import { BasicInfo } from "../components/tutor/profile/BasicInfo";
import {
  Education,
  FormalEducation,
} from "../components/tutor/profile/Education";
import { SkillsExperience } from "../components/tutor/profile/SkillExperience";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  dob: string;
  phoneCode: string;
  phoneNumber: string;
  role: string;
}

export interface TutorData {
  id: string;
  description: string;
  experience: number;
  skills: string;
  rating: string;
  video: string;
  location: string;
  languages: string;
  currency: string;
  charge: string;
  chargeType: string;
  days: string;
  startTime: string;
  endTime: string;
  formalEducation: FormalEducation[];
  user: User;
}

const tutor = {
  id: "0191adea-3163-777b-86ad-2806f0f73302",
  description: `I am a highly skilled and experienced tutor with over 10 years of professional experience in teaching a wide range of subjects including Mathematics, Physics, and Chemistry.`,
  experience: 10,
  skills:
    "Problem solving, Communication, Patience, Adaptability, Time management",
  rating: "4.7",
  video: "https://example.com/demo-video.mp4",
  location: "Madhubani, Bihar, India",
  languages: "Maithili, Hindi, English, Punjabi",
  currency: "INR",
  charge: "100.00",
  chargeType: "hourly",
  days: "Monday, Wednesday, Friday, Saturday",
  startTime: "09:00:00",
  endTime: "18:00:00",
  formalEducation: [
    {
      id: "0191adea-32b2-777b-86ad-36835ba71ca9",
      qualification: "Masters in Mathematics",
      institution: "Harvard University",
      year: 2010,
      subjects: "Mathematics, Physics, Chemistry",
    },
    {
      id: "0191adea-45d7-789b-98bc-45623fa78e92",
      qualification: "Bachelor of Science in Physics",
      institution: "University of Delhi",
      year: 2008,
      subjects: "Physics, Mathematics, Computer Science",
    },
  ],
  user: {
    id: "0191ad18-3aa4-7333-af31-c06d8b96bab9",
    username: "john_doe_professional",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    avatar: "https://i.pravatar.cc/300",
    dob: "1990-01-01",
    phoneCode: "+91",
    phoneNumber: "9876543210",
    role: "tutor",
  },
};

const TutorProfile: React.FC = () => {
  return (
    <div className="max-w-3xl flex gap-x-8 mx-auto">
      {/* Left side: Tutor Profile */}
      <div className="">
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
