import React from 'react';
import { Availability } from '../components/tutor-profile/Availability';
import { BasicInfo } from '../components/tutor-profile/BasicInfo';
import { Education, FormalEducation } from '../components/tutor-profile/Education';
import { SkillsExperience } from '../components/tutor-profile/SkillExperience';

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

export const TutorProfile: React.FC<{ tutor: TutorData }> = ({ tutor }) => {
    return (
        <div className="max-w-3xl mx-auto p-4">
            <BasicInfo tutor={tutor} />
            <Availability tutor={tutor} />
            <SkillsExperience tutor={tutor} />
            <Education education={tutor.formalEducation} />
        </div>
    );
};
