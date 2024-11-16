import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";

import { UserList } from "../user/search/UserList";
import { User, userApi } from "../../api/user";
import { getLoggedInUser } from "../../utils/user";

const UserRecommendations: React.FC = () => {
    const LIMIT = 25; // Number of results per page
    const [users, setUsers] = useState<User[]>([]); // State to store the list of users
    const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
    const [loading, setLoading] = useState(false); // State to handle loading status
    const [offset, setOffset] = useState(0);

    const fetchRecommendations = async (offset: number, limit: number) => {
        setLoading(true);
        const CURRENT_USER = getLoggedInUser();
        let users = await userApi.getRecommededUsers(
            CURRENT_USER ? CURRENT_USER.id : null,
            (currentPage - 1) * LIMIT, // Calculate offset for pagination
            LIMIT // Limit the number of results per page
        );
        if (users) {
            setUsers(
                users.map((user) => {
                    return {
                        ...user,
                        rating: (Math.random() * 5).toString(),
                        currency: "INR",
                        avatar: `https://i.pravatar.cc/150?img=3`,
                    };
                })
            );
        }
        setLoading(false); // Set loading to false when fetch is complete
    };

    useEffect(() => {
        fetchRecommendations(offset, LIMIT); // Fetch recommendations when component mounts or page changes
    }, [currentPage]);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow max-w-3xl mx-auto w-full">
                {/* Display loader while data is being fetched */}
                {loading ? (
                    <div className="flex justify-center my-4">
                        <Loader className="animate-spin" size={24} />
                    </div>
                ) : (
                    <UserList users={users} />
                )}
            </div>
        </div>
    );
};

export default UserRecommendations;
