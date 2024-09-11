import React, { useState } from "react";
import { Loader } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      setLoading(true);
      navigate(`/search?q=${searchValue}`);
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearch();
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className={`w-full p-2 pl-10 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          loading ? "pr-12" : ""
        }`}
      />
      <div
        onClick={handleSearch}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center ${
          loading ? "" : ""
        } cursor-pointer p-2 mr-2`}
      >
        {loading ? (
          <Loader className="animate-spin" size={16} />
        ) : (
          <FaSearch size={16} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
