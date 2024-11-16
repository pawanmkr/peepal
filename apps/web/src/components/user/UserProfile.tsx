import { useNavigate } from "react-router-dom";
import { User, userApi } from "../../api/user";
import { getLoggedInUser } from "../../utils/user";
import TopSearches from "../home/TopSearches";
import "./UserProfile.css";
import React, { useEffect, useState } from "react";

const visibleSessions = 3;

const UserProfile = () => {
    const CURRENT_USER = getLoggedInUser();
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await userApi.getUserById(CURRENT_USER.id);
            setUser(fetchedUser); // Set the fetched user to state
        };

        fetchUser();
    }, [CURRENT_USER.id]); // Re-run if the user ID changes

    // Return loading state or user profile when data is fetched
    if (!user) {
        return <div>Loading...</div>; // Display loading while fetching user
    }

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden border shadow-sm mb-4">
            {/* User Info */}
            <div className="flex items-center px-4 py-3 border-b border-gray-200">
                <img
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-300 cursor-pointer"
                    src={user.avatar || "https://i.pravatar.cc/300"}
                    alt="User Avatar"
                    onClick={() => {
                        navigate(`/user/${user.id}`); // Navigate to user's profile page
                    }}
                />
                <div className="ml-4">
                    <h2 className="text-xl font-semibold m-0">
                        {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-gray-600 m-0">@{user.username}</p>
                </div>
            </div>

            {/* Additional Info Section */}
            <div className="px-4 py-2 bg-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    About
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                    <strong>Description</strong>
                    {"\n"}
                    <p>{user.description || "No description provided."}</p>
                </p>
                <div>
                    <p className="text-sm text-gray-700">
                        <strong>Skills</strong>
                        {"\n"}
                        <p>{user.skills || "No skills listed."}</p>
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-700">
                        <strong>Rating</strong>
                        {"\n"}
                        <p>{user.rating || "Not rated yet."}</p>
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-700">
                        <strong>Location</strong>
                        {"\n"}
                        <p>{user.location || "Location not provided."}</p>
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-700">
                        <strong>Languages</strong>
                        {"\n"}
                        <p>{user.languages || "Languages not provided."}</p>
                    </p>
                </div>
            </div>

            {/* Sessions Info */}
            {/* <div className="px-3 py-3 bg-blue-50">
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
                                {getNextSessionDate(session.rule)}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">
                        No upcoming sessions scheduled. Stay tuned for updates!
                    </p>
                )}
            </div> */}

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
