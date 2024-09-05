import { TutorData } from '../../pages/TutorProfile';

export const SkillsExperience: React.FC<{ tutor: TutorData }> = ({ tutor }) => (
    <div className="bg-white shadow rounded-lg mb-6 p-4">
        <h3 className="text-xl font-semibold mb-2">Skills &amp; Experience</h3>
        <p className="mb-2">Experience: {tutor.experience} years</p>
        <div className="flex flex-wrap gap-2">
            {tutor.skills.split(', ').map((skill, index) => (
                <span
                    key={index}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                >
                    {skill}
                </span>
            ))}
        </div>
    </div>
);
