import React, { useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NotificationIcon from "./NotificationIcon";
import UserProfileIcon from "./UserProfileIcon";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";
import ChatIcon from "./ChatIcon"; // Import the Chat Icon
import { getLoggedInUser } from "../../utils/user";
import ChatHistory from "../chat/ChatHistory";

interface Notification {
    id: string;
    message: string;
    seen: boolean;
}

const Header: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<"profile" | "notification" | "chat" | null>(null); // Track the currently open menu
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: "1", message: "New session booked", seen: false },
        { id: "2", message: "Profile updated", seen: true },
    ]);

    const unseenCount = notifications.filter(
        (notification) => !notification.seen
    ).length;

    const handleMenuClick = (menu: "profile" | "notification" | "chat") => {
        setActiveMenu((prev) => (prev === menu ? null : menu)); // Toggle the clicked menu
    };

    const handleCloseMenu = () => {
        setActiveMenu(null); // Close all menus
    };

    return (
        <>
            <header className="w-full bg-white border-b border-gray-300 fixed top-0 left-0 z-50 py-2">
                {/* Limit width and center header content */}
                <div className="max-w-7xl mx-auto flex justify-between items-center px-[12px]">
                    <Logo className="text-blue-600" />
                    <SearchBar />
                    <div className="relative flex items-center">
                        {/* Chat Icon */}
                        <div className="relative mr-4">
                            <button
                                onClick={() => handleMenuClick("chat")}
                                aria-label="Chat"
                                className="focus:outline-none"
                            >
                                <ChatIcon />
                            </button>
                        </div>

                        {/* Notification Icon */}
                        <div className="relative mr-4">
                            <NotificationIcon
                                unseenCount={unseenCount}
                                onClick={() => handleMenuClick("notification")}
                            />
                            <NotificationDropdown
                                isOpen={activeMenu === "notification"}
                                onClose={handleCloseMenu}
                                notifications={notifications}
                                unseenCount={unseenCount}
                            />
                        </div>

                        {/* Profile Icon */}
                        <div className="relative">
                            <button
                                onClick={() => handleMenuClick("profile")}
                                aria-label="Profile"
                                className="focus:outline-none"
                            >
                                <UserProfileIcon />
                            </button>
                            <ProfileDropdown
                                isOpen={activeMenu === "profile"}
                                onClose={handleCloseMenu}
                            />
                        </div>
                    </div>
                </div>
            </header>
            <ChatHistory
                isOpen={activeMenu === "chat"}
                onClose={handleCloseMenu}
            />
        </>
    );
};

export default Header;
