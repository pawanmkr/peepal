import { TutorData } from "apps/web/src/pages/TutorProfile";
import { InfoItem } from "./InfoItem";

export const Availability: React.FC<{ professional: TutorData }> = ({
    professional,
}) => (
    <div className="bg-white shadow-md rounded-lg mb-6 p-4">
        <h3 className="text-xl font-semibold mb-2">Availability</h3>
        <InfoItem
            icon="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            text={professional.days}
        />
        <InfoItem
            icon="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            text={`${professional.startTime} - ${professional.endTime}`}
        />
    </div>
);
