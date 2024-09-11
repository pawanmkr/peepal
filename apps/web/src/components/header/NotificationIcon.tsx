import React from "react";

interface NotificationIconProps {
  unseenCount: number;
  onClick: () => void;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  unseenCount,
  onClick,
}) => {
  return (
    <div className="relative flex">
      {/* Bell Icon */}
      <button onClick={onClick} aria-label="Notifications" className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.403-1.403A2 2 0 0118 14V9a6 6 0 00-4-5.659V3a1 1 0 00-2 0v.341A6 6 0 006 9v5a2 2 0 01-.597 1.197L4 17h5m6 0a3 3 0 01-6 0m6 0H9"
          />
        </svg>
      </button>

      {/* Notification Count Badge */}
      {unseenCount > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {unseenCount}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
