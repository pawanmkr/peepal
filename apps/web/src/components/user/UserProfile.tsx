import "./UserProfile.css";
import React, { useState } from "react";

type UserProfileProps = {
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    dob: string;
    phoneCode: string;
    phoneNumber: string;
    role: string;
  };
  sessions: {
    name: string;
    description: string;
    cost: number;
    duration: number;
    rule: string;
  }[];
};

const visibleSessions = 3;
const UserProfile: React.FC<UserProfileProps> = ({ user, sessions }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden border shadow-sm">
      {/* User Info */}
      <div className="flex items-center px-3 py-3">
        <img
          className="w-16 h-16 rounded-full object-cover border-5 border-gray-300"
          src={user.avatar || "https://i.pravatar.cc/300"}
          alt="User Avatar"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold m-0">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600 m-0">@{user.username}</p>
        </div>
      </div>

      {/* Sessions Info */}
      <div className="px-3 py-3 bg-blue-50">
        <h3 className="text-base text-gray-800">Upcoming Sessions</h3>
        {sessions.length > 0 ? (
          sessions.slice(0, visibleSessions).map((session, index) => (
            <div
              key={index}
              className={`py-2 ${
                index === visibleSessions - 1 ? "" : "border-b border-gray-300"
              }`}
            >
              <h4 className="text-md">{session.name}</h4>
              <p className="text-sm text-gray-700">{session.description}</p>
              <p className="text-sm text-gray-500">
                {session.duration} min
                {/* {getNextSessionDate(session.rule)} */}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            No upcoming sessions scheduled. Stay tuned for updates!
          </p>
        )}
      </div>

      {/* Action Button */}
      {/* <div className="px-6 py-3">
        <a
          href={`mailto:${user.email}`}
          className="bg-blue-500 text-white px-4 py-2 rounded block text-center hover:bg-blue-600"
        >
          Contact User
        </a>
      </div> */}
    </div>
  );
};

export default UserProfile;
