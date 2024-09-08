import React from "react";
import { useNavigate } from "react-router-dom";
import { TutorBasicInfo } from "apps/web/src/pages/TutorSearch";
import { Rating } from "../common/Rating";

export const TutorCard: React.FC<{ tutor: TutorBasicInfo }> = ({ tutor }) => {
  const navigate = useNavigate();

  const openTutorProfile = () => {
    // Navigate to the tutor profile page, e.g., /tutor/{tutorId}
    // navigate(`/tutor/${tutor.id}`);
    navigate(`/tutor`);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div
        className="flex items-center space-x-4 mb-4 cursor-pointer"
        onClick={openTutorProfile}
      >
        <img
          src={tutor.avatar}
          alt={`${tutor.firstName} ${tutor.lastName}`}
          className="w-16 h-16 rounded-full"
        />
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">
              {tutor.firstName} {tutor.lastName}
            </h2>
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
        <p className="text-lg font-semibold">
          {tutor.charge} {tutor.currency} ({tutor.chargeType})
        </p>
      </div>
    </div>
  );
};
