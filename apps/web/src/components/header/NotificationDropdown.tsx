import React from "react";

interface Notification {
  id: string;
  message: string;
  seen: boolean;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  unseenCount: number;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  notifications,
  unseenCount,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-md z-50"
      onMouseLeave={onClose} // Close dropdown when mouse leaves
    >
      <div className="px-4 py-2 font-semibold border-b border-gray-300 bg-gray-50">
        Notifications ({unseenCount})
      </div>
      {notifications.length > 0 ? (
        <div className="max-h-60 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-b last:border-b-0 ${
                notification.seen ? "text-gray-700" : "bg-yellow-100"
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">No notifications</div>
      )}
    </div>
  );
};

export default NotificationDropdown;
