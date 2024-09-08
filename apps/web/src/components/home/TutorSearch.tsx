import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

import SearchResultReport from "./SearchResultReport";
import { TutorList } from "../tutor/search/TutorList";
import { Tutor, tutorApi } from "../../api/tutor";

const LIMIT = 25;

const TutorSearch: React.FC<{ query: string }> = ({ query }) => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Function to handle the search
  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    const response = await tutorApi.searchTutors(
      searchQuery,
      (currentPage - 1) * LIMIT,
      LIMIT
    );
    console.log(response);
    setTutors(response);
    setTotalResults(response.length);
    setLoading(false);
  };

  useEffect(() => {
    if (query) handleSearch(query);
  }, [query, currentPage]);

  const pageCount = Math.ceil(totalResults / LIMIT);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to the top when changing pages
  };

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const postParam = queryParams.get("post") === "true";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-3xl mx-auto w-full">
        {/* Search results */}
        {location.pathname === "/search" && query && (
          <SearchResultReport
            totalResults={totalResults}
            query={query}
            postParam={postParam}
          />
        )}

        {loading ? (
          <div className="flex justify-center my-4">
            <Loader className="animate-spin" size={24} />
          </div>
        ) : (
          <TutorList tutors={tutors} />
        )}

        {pageCount > 1 && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 mt-8">
            <div className="max-w-3xl mx-auto flex justify-center space-x-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorSearch;
