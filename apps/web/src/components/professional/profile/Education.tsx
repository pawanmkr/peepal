import React, { useState } from "react";

export interface FormalEducation {
  id: string;
  qualification: string;
  institution: string;
  year: number;
  subjects: string;
}

export const Education: React.FC<{ education: FormalEducation[] }> = ({
  education,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-1">
      <h3 className="text-xl font-semibold">Education</h3>
      {education.map((edu) => (
        <div key={edu.id}>
          <h4 className="m-0">{edu.qualification}</h4>
          <p className="text-sm text-gray-500">
            {edu.institution}, {edu.year}
          </p>
          <p className="m-0">Subjects: {edu.subjects}</p>
        </div>
      ))}
    </div>
  );
};
