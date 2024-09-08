import React from "react";
import { format } from "date-fns"; // For date formatting
import { rrulestr } from "rrule"; // For RRULE parsing

// this component should show the upcoming 3 sessions of a user, with the following details: [user, duration, time, sesstion-title]

import "./UserProfile.css";

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

// Function to extract next session date from RRULE
// const getNextSessionDate = (rulestr: string) => {
//   const rule = rrulestr(rulestr);
//   console.log(rule);
//   const nextDate = rule.after(new Date());
//   console.log(nextDate);
//   if (nextDate) return nextDate.toISOString();
//   return " No upcoming sessions";
// };

const UserProfile: React.FC<UserProfileProps> = ({ user, sessions }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden border shadow-sm">
      {/* User Info */}
      <div className="flex items-center px-3 py-3">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={user.avatar || "https://i.pravatar.cc/300"}
          alt="User Avatar"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>

      {/* Sessions Info */}
      <div className="px-3 py-3 bg-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          Upcoming Sessions
        </h3>
        {sessions.length > 0 ? (
          sessions.slice(0, 3).map((session, index) => (
            <div key={index} className="border-b border-gray-300 py-2">
              <h4 className="font-semibold">{session.name}</h4>
              <p className="text-sm text-gray-700">{session.description}</p>
              <p className="text-sm text-gray-500">
                {session.duration} min
                {/* {getNextSessionDate(session.rule)} */}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No upcoming sessions</p>
        )}
      </div>

      {/* Action Button */}
      <div className="px-6 py-3">
        <a
          href={`mailto:${user.email}`}
          className="bg-blue-500 text-white px-4 py-2 rounded block text-center hover:bg-blue-600"
        >
          Contact User
        </a>
      </div>
    </div>
  );
};

export default UserProfile;
