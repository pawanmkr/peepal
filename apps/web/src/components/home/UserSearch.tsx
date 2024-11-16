import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

import SearchResultReport from "./SearchResultReport";
import { UserList } from "../user/search/UserList";
import Pagination from "./Pagination";
import { User, userApi } from "../../api/user";

const UserSearch: React.FC<{ query: string }> = ({ query }) => {
    const LIMIT = 25; // Number of results per page
    const [users, setUsers] = useState<User[]>([]); // State to store the list of users
    const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
    const [totalResultsFound, setTotalResultsFound] = useState(-1); // State to store the total number of results
    const location = useLocation(); // Hook to access location object
    const [loading, setLoading] = useState(false); // State to handle loading status

    // Function to handle the search
    const handleSearch = async (searchQuery: string) => {
        setTotalResultsFound(-1); // Reset total results found
        setLoading(true);
        let res = await userApi.searchUsers(
            searchQuery,
            (currentPage - 1) * LIMIT, // Calculate offset for pagination
            LIMIT // Limit the number of results per page
        );
        if (res) {
            setUsers(
                res.users.map((user) => {
                    return {
                        ...user,
                        rating: (Math.random() * 5).toString(), // Dummy rating
                        currency: "INR",
                        avatar: `https://i.pravatar.cc/150?u=${user.email}`,
                    };
                })
            );
            setTotalResultsFound(res.total);
        }
        setLoading(false); // Set loading to false when search is complete
    };

    useEffect(() => {
        if (query) handleSearch(query); // Perform search when query or page changes
    }, [query, currentPage]);

    // Calculate the total number of pages
    const pageCount = Math.ceil(totalResultsFound / LIMIT);

    // Function to handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to the top when changing pages
    };

    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const postParam = queryParams.get("post") === "true";

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow max-w-3xl mx-auto w-full">
                {/* Search results */}
                {location.pathname === "/search" &&
                    query &&
                    totalResultsFound >= 0 && (
                        <SearchResultReport
                            totalResultsFound={totalResultsFound}
                            query={query}
                            postParam={postParam}
                        />
                    )}

                {/* Display loader while data is being fetched */}
                {loading ? (
                    <div className="flex justify-center my-4">
                        <Loader className="animate-spin" size={24} />
                    </div>
                ) : (
                    <>
                        {/* Display message when no results are found */}
                        {totalResultsFound === 0 && (
                            <div className="flex justify-center mt-4 mb-2">
                                <p>Here are some suggestions for you</p>
                            </div>
                        )}
                        <UserList users={users} />{" "}
                        {/* Display the list of users */}
                        {/* Conditionally render pagination only if there are more results than fit on one page */}
                        {totalResultsFound > LIMIT && (
                            <Pagination
                                currentPage={currentPage}
                                pageCount={pageCount}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UserSearch;
