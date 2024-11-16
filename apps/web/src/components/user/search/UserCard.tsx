import React from "react";
import { useNavigate } from "react-router-dom";

import { Rating } from "../profile/Rating";
import { User } from "apps/web/src/api/user";

export const UserCard: React.FC<{ user: User }> = ({ user }) => {
    const navigate = useNavigate();

    const openUserProfile = () => {
        navigate(`/user/${user.id}`);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-3 mb-3 border-1">
            <div
                className="flex space-x-4 cursor-pointer"
                onClick={openUserProfile}
            >
                <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-12 h-12 rounded-full mt-1"
                />
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <p className="text-2xl m-0">
                            {user.firstName} {user.lastName}
                        </p>
                        <Rating rating={user.rating} />
                    </div>
                    <p className="text-sm text-gray-500">{user.description}</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                    {user.skills != null &&
                        user.skills
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
                    {user.charge} {user.currency} ({user.chargeType})
                </p>
            </div>
        </div>
    );
};
