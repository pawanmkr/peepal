import React, { useState } from 'react';

export interface FormalEducation {
    id: string;
    qualification: string;
    institution: string;
    year: number;
    subjects: string;
}

export const Education: React.FC<{ education: FormalEducation[] }> = ({ education }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? '▲' : '▼'}
                </button>
            </div>
            {isExpanded && education.map((edu) => (
                <div key={edu.id} className="mb-4">
                    <h4 className="font-semibold">{edu.qualification}</h4>
                    <p className="text-sm text-gray-500">
                        {edu.institution}, {edu.year}
                    </p>
                    <p className="text-sm">Subjects: {edu.subjects}</p>
                </div>
            ))}
            {!isExpanded && education.length > 0 && (
                <p className="text-sm text-gray-500">Click the arrow to see more details</p>
            )}
        </div>
    );
};
