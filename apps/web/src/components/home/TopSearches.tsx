import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Loader } from "lucide-react";
import { fetchTopSearches } from "../../api/misc";
import { useNavigate } from "react-router-dom";

const TopSearches: React.FC = () => {
  const [searches, setSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetch = async () => {
      let keywords = await fetchTopSearches();
      const uniqueKeywords = Array.from(new Set(keywords));
      keywords = [];
      for (let i = 0; i < 10; i++) {
        keywords.push(uniqueKeywords[i]);
      }
      setSearches(keywords);
      setLoading(false);
    };
    fetch();
  }, []);

  function handleKeywordClick(keyword: string) {
    // Navigate to the search results page with the clicked keyword
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  }

  return (
    <div className="card shadow-sm mb-4 bg-white rounded-lg">
      <div className="card-body pb-0">
        <h5 className="card-title text-lg font-bold mb-3 flex items-center">
          <FaSearch className="mr-2 text-blue-500" /> Top Searches
        </h5>
        {loading ? (
          <div className="w-full p-2 mb-4">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <ul className="list-none p-0">
            {searches.map((search, index) => (
              <li
                key={index}
                className={`py-2 flex items-center text-sm cursor-pointer ${
                  index < searches.length - 1 ? "border-b border-gray-200" : ""
                }`}
                onClick={() => handleKeywordClick(search)} // Call handleKeywordClick with the clicked keyword
              >
                <span className="font-bold text-gray-500 mr-3">
                  {index + 1}.
                </span>{" "}
                {search}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopSearches;
