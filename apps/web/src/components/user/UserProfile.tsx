import React from "react";
import { format } from "date-fns";
import { rrulestr } from "rrule";
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

const getNextSessionDate = (rulestr: string) => {
  const rule = rrulestr(rulestr);
  const nextDate = rule.after(new Date());
  if (nextDate) return format(nextDate, "dd MMM yyyy");
};

const UserProfile: React.FC<UserProfileProps> = ({ user, sessions }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* User Info */}
      <div className="flex items-center px-6 py-4">
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

      {/* User Details */}
      <div className="px-6 py-4">
        <p className="text-gray-800">Email: {user.email}</p>
        <p className="text-gray-800">Date of Birth: {format(new Date(user.dob), "dd MMM yyyy")}</p>
        <p className="text-gray-800">Phone: {user.phoneCode} {user.phoneNumber}</p>
        <p className="text-gray-800">Role: {user.role}</p>
      </div>

      {/* Sessions */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-2">Upcoming Sessions</h3>
        {sessions.map((session) => (
          <div key={session.name} className="mb-2">
            <h4 className="font-semibold">{session.name}</h4>
            <p>{session.description}</p>
            <p>Cost: ${session.cost}</p>
            <p>Duration: {session.duration} minutes</p>
            <p>Next Session: {getNextSessionDate(session.rule) || "No upcoming sessions"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
