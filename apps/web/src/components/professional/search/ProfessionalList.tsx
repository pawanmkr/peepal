import { Professional } from "apps/web/src/api/professional";
import { ProfessionalCard } from "./ProfessionalCard";

export const ProfessionalList: React.FC<{ professionals: Professional[] }> = ({
    professionals,
}) => (
    <div>
        {professionals.map((professional) => (
            <ProfessionalCard
                key={professional.id}
                professional={professional}
            />
        ))}
    </div>
);
