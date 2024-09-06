import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NotificationIcon from "./NotificationIcon";
import UserProfileIcon from "./UserProfileIcon";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-300 py-2 px-6 fixed top-0 left-0 z-50">
      {/* Limit width and center header content */}
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        <SearchBar />
        <div className="flex items-center">
          <NotificationIcon />
          <UserProfileIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
