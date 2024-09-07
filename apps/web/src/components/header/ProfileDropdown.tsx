import React from "react";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50"
      onMouseLeave={onClose} // Close when mouse leaves the dropdown
    >
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
