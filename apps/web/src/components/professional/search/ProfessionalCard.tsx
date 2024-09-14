import React from "react";
import { useNavigate } from "react-router-dom";

import { Rating } from "../common/Rating";
import { Professional } from "apps/web/src/api/professional";

export const ProfessionalCard: React.FC<{ professional: Professional }> = ({
    professional,
}) => {
    const navigate = useNavigate();

    const openTutorProfile = () => {
        navigate(`/professional/${professional.id}`);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-3 mb-3 border-1">
            <div
                className="flex space-x-4 cursor-pointer"
                onClick={openTutorProfile}
            >
                <img
                    src={professional.user.avatar}
                    alt={`${professional.user.firstName} ${professional.user.lastName}`}
                    className="w-12 h-12 rounded-full mt-1"
                />
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <p className="text-2xl m-0">
                            {professional.user.firstName}{" "}
                            {professional.user.lastName}
                        </p>
                        <Rating rating={professional.rating} />
                    </div>
                    <p className="text-sm text-gray-500">
                        {professional.description}
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                    {professional.skills
                        .split(", ")
                        .slice(0, 3)
                        .map((skill, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700"
                            >
                                {skill}
                            </span>
                        ))}
                </div>
                <p className="text-base m-0">
                    {professional.charge} {professional.currency} (
                    {professional.chargeType})
                </p>
            </div>
        </div>
    );
};
