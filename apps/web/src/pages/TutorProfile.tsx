import React from 'react';
import { Availability } from '../components/tutor/profile/Availability';
import { BasicInfo } from '../components/tutor/profile/BasicInfo';
import { FormalEducation, Education } from '../components/tutor/profile/Education';
import { SkillsExperience } from '../components/tutor/profile/SkillExperience';

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
    availability: string;
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
    id: '0191adea-3163-777b-86ad-2806f0f73302',
    description: `I am a highly skilled and experienced tutor with over 10 years of professional experience in teaching a wide range of subjects including Mathematics, Physics, and Chemistry.
        Having worked with students of diverse backgrounds and learning styles, I have developed a deep understanding of how to tailor my teaching methods to meet individual needs. I am passionate about helping students excel in their academic journey and equipping them with the tools needed for long-term success.`,
    experience: 10, // Updated to reflect the years mentioned in the description
    skills: 'Problem solving, Communication, Patience, Adaptability, Time management',
    rating: '4.7', // Increased rating to reflect higher competence and experience
    video: 'https://example.com/demo-video.mp4', // Updated video link for clarity
    location: 'Madhubani, Bihar, India', // More specific location
    languages: 'Maithili, Hindi, English, Punjabi',
    availability: 'Available on weekdays and weekends for flexible scheduling',
    currency: 'INR',
    charge: '100.00', // Increased to reflect higher experience
    chargeType: 'hourly',
    days: 'Monday, Wednesday, Friday, Saturday', // Added an extra day for flexibility
    startTime: '09:00:00', // Slightly adjusted times for better flow
    endTime: '18:00:00',
    formalEducation: [
        {
            id: '0191adea-32b2-777b-86ad-36835ba71ca9',
            qualification: 'Masters in Mathematics',
            institution: 'Harvard University',
            year: 2010,
            subjects: 'Mathematics, Physics, Chemistry',
        },
        {
            id: '0191adea-45d7-789b-98bc-45623fa78e92',
            qualification: 'Bachelor of Science in Physics',
            institution: 'University of Delhi',
            year: 2008,
            subjects: 'Physics, Mathematics, Computer Science',
        },
    ],
    user: {
        id: '0191ad18-3aa4-7333-af31-c06d8b96bab9',
        username: 'john_doe_professional',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        avatar: 'https://i.pravatar.cc/300',
        dob: '1990-01-01',
        phoneCode: '+91',
        phoneNumber: '9876543210',
        role: 'tutor', // Updated to clarify role
    },
};

const TutorProfile: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto p-4">
            <BasicInfo tutor={tutor} />
            <Availability tutor={tutor} />
            <SkillsExperience tutor={tutor} />
            <Education education={tutor.formalEducation} />
        </div>
    );
};

export default TutorProfile;
