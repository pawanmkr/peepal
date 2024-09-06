import React from "react";
import { FaUserCircle } from "react-icons/fa";

const UserProfileIcon: React.FC = () => {
  return (
    <div className="text-2xl text-gray-600 hover:text-gray-800 cursor-pointer">
      <FaUserCircle />
    </div>
  );
};

export default UserProfileIcon;
