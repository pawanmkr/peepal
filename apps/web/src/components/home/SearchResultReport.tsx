import { useNavigate } from "react-router-dom";

export interface SearchResultReportProps {
  totalResultsFound: number;
  query: string;
  postParam: boolean;
}

const SearchResultReport = ({
  totalResultsFound,
  query,
  postParam,
}: SearchResultReportProps) => {
  const navigate = useNavigate();

  const handleNavigation = (isPost: boolean) => {
    if (isPost) {
      navigate(`/search?q=${query}&post=true`);
    } else {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="card border-1 bg-white rounded-lg p-3 mb-4 shadow-sm">
      <p className="text-gray-600">
        Found <span className="font-bold">{totalResultsFound}</span> results for
        "<span className="italic">{query}</span>"
      </p>

      <div className="inline-flex gap-x-4 mb-2">
        <button
          onClick={() => handleNavigation(false)}
          className={`border-1 border-gray-400 cursor-pointer rounded py-1 px-2 outline-none ${
            postParam ? "" : "bg-blue-600 text-white border-blue-600"
          }`}
        >
          People
        </button>

        <button
          onClick={() => handleNavigation(true)}
          className={`border-1 border-gray-400 cursor-pointer rounded py-1 px-2 outline-none ${
            postParam ? "bg-blue-600 text-white border-blue-600" : ""
          }`}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default SearchResultReport;
