import React from "react";
import { useNavigate } from "react-router-dom";

import { getLoggedInUser } from "../../utils/user";
import { UserRole } from "../../api/user";

interface ProfileDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;
    const user = getLoggedInUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/home";
    };

    return (
        <div
            className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md"
            onMouseLeave={onClose} // Close when mouse leaves the dropdown
        >
            <ul className="m-0 p-2">
                {user && (
                    <li
                        className="p-2 hover:bg-gray-200 rounded-sm cursor-pointer w-max border-b"
                        onClick={() => {
                            navigate("/professional/form");
                        }}
                    >
                        {user?.role === UserRole.USER ? (
                            <span>
                                Switch to <br /> Professional Account
                            </span>
                        ) : (
                            "Edit Profile"
                        )}
                    </li>
                )}
                <li className="p-2 hover:bg-gray-200 rounded-sm cursor-pointer border-b">
                    Profile
                </li>
                <li className="p-2 hover:bg-gray-200 rounded-sm cursor-pointer border-b">
                    Settings
                </li>
                <li
                    className="p-2 hover:bg-gray-200 rounded-sm cursor-pointer"
                    onClick={handleLogout}
                >
                    Logout
                </li>
            </ul>
        </div>
    );
};

export default ProfileDropdown;
