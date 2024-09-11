import { Tutor } from "apps/web/src/api/tutor";
import React, { useState } from "react";

export const SkillsExperience: React.FC<{ tutor: Tutor }> = ({ tutor }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-2">Skills & Experience</h3>
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
    </div>
  );
};
