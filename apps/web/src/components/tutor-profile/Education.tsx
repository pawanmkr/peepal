export interface FormalEducation {
    id: string;
    qualification: string;
    institution: string;
    year: number;
    subjects: string;
}

export const Education: React.FC<{ education: FormalEducation[] }> = ({ education }) => (
    <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">Education</h3>
        {education.map((edu) => (
            <div key={edu.id} className="mb-4">
                <h4 className="font-semibold">{edu.qualification}</h4>
                <p className="text-sm text-gray-500">
                    {edu.institution}, {edu.year}
                </p>
                <p className="text-sm">Subjects: {edu.subjects}</p>
            </div>
        ))}
    </div>
);
