import React, { useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NotificationIcon from "./NotificationIcon";
import UserProfileIcon from "./UserProfileIcon";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";

interface Notification {
  id: string;
  message: string;
  seen: boolean;
}

const Header: React.FC = () => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", message: "New session booked", seen: false },
    { id: "2", message: "Profile updated", seen: true },
  ]);
  const unseenCount = notifications.filter(
    (notification) => !notification.seen
  ).length;

  const handleProfileIconClick = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  const handleNotificationClick = () => {
    setNotificationMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setProfileMenuOpen(false);
    setNotificationMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-gray-300 fixed top-0 left-0 z-50 py-2">
      {/* Limit width and center header content */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-[12px]">
        <Logo className="text-blue-600" />
        <SearchBar />
        <div className="relative flex items-center">
          <div className="relative mr-4">
            <NotificationIcon
              unseenCount={unseenCount}
              onClick={handleNotificationClick}
            />
            <NotificationDropdown
              isOpen={isNotificationMenuOpen}
              onClose={handleCloseMenu}
              notifications={notifications}
              unseenCount={unseenCount}
            />
          </div>
          <div className="relative">
            <button
              onClick={handleProfileIconClick}
              aria-label="Profile"
              className="focus:outline-none"
            >
              <UserProfileIcon />
            </button>
            <ProfileDropdown
              isOpen={isProfileMenuOpen}
              onClose={handleCloseMenu}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
