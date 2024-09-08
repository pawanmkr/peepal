import { TutorData } from "apps/web/src/pages/TutorProfile";
import React, { useState } from "react";

export const SkillsExperience: React.FC<{ tutor: TutorData }> = ({ tutor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg mb-6 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mb-2">Skills & Experience</h3>
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "▲" : "▼"}
        </button>
      </div>
      {isExpanded && (
        <div>
          <p className="mb-2">Experience: {tutor.experience} years</p>
          <div className="flex flex-wrap gap-2">
            {tutor.skills.split(", ").map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      {!isExpanded && (
        <p className="text-sm text-gray-500">
          Click the arrow to see more details
        </p>
      )}
    </div>
  );
};
