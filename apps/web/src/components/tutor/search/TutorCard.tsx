import React from "react";
import { useNavigate } from "react-router-dom";

import { Rating } from "../common/Rating";
import { Tutor } from "apps/web/src/api/tutor";

export const TutorCard: React.FC<{ tutor: Tutor }> = ({ tutor }) => {
  const navigate = useNavigate();

  const openTutorProfile = () => {
    // Navigate to the tutor profile page, e.g., /tutor/{tutorId}
    // navigate(`/tutor/${tutor.id}`);
    navigate(`/tutor`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-3 mb-3 border-1">
      <div className="flex space-x-4 cursor-pointer" onClick={openTutorProfile}>
        <img
          src={tutor.user.avatar}
          alt={`${tutor.user.firstName} ${tutor.user.lastName}`}
          className="w-12 h-12 rounded-full mt-1"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <p className="text-2xl m-0">
              {tutor.user.firstName} {tutor.user.lastName}
            </p>
            <Rating rating={tutor.rating} />
          </div>
          <p className="text-sm text-gray-500">{tutor.description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {tutor.skills
            .split(", ")
            .slice(0, 3)
            .map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700"
              >
                {skill}
              </span>
            ))}
        </div>
        <p className="text-base m-0">
          {tutor.charge} {tutor.currency} ({tutor.chargeType})
        </p>
      </div>
    </div>
  );
};
