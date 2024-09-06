import React from "react";
import { FaBell } from "react-icons/fa";

const NotificationIcon: React.FC = () => {
  return (
    <div className="text-lg mx-4 text-gray-600 hover:text-gray-800 cursor-pointer">
      <FaBell />
    </div>
  );
};

export default NotificationIcon;
