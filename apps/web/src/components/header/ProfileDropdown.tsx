import React from "react";
import { useNavigate } from "react-router-dom";

import { getLoggedInUser } from "../../utils/user";

interface ProfileDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
    isOpen,
    onClose,
}) => {
    const navigate = useNavigate();
    const user = getLoggedInUser();

    if (!isOpen || !user) return null; // Return null if dropdown is not open or no user is logged in

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
                <li
                    className="p-2 hover:bg-gray-200 rounded-sm cursor-pointer border-b"
                    onClick={() => {
                        navigate("/user/form");
                    }}
                >
                    Edit Profile
                </li>
                <li
                    className="p-2 hover:bg-gray-200 rounded-sm cursor-pointer border-b"
                    onClick={() => {
                        navigate(`/user/${user.id}`); // Navigate to user's profile page
                    }}
                >
                    Profile
                </li>
                <li
                    className="p-2 hover:bg-gray-200 rounded-sm cursor-pointer border-b"
                    onClick={() => {
                        navigate("/settings"); // Redirect to a settings page if applicable
                    }}
                >
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
