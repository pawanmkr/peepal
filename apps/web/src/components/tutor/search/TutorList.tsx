import { TutorBasicInfo } from "../../pages/TutorSearch";
import { TutorCard } from "./TutorCard";

export const TutorList: React.FC<{ tutors: TutorBasicInfo[] }> = ({
  tutors,
}) => (
  <div>
    {tutors.map((tutor) => (
      <TutorCard key={tutor.id} tutor={tutor} />
    ))}
  </div>
);
