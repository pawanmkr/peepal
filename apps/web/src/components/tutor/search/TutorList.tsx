import { Tutor } from "apps/web/src/api/tutor";
import { TutorCard } from "./TutorCard";

export const TutorList: React.FC<{ tutors: Tutor[] }> = ({ tutors }) => (
  <div>
    {tutors.map((tutor) => (
      <TutorCard key={tutor.id} tutor={tutor} />
    ))}
  </div>
);
