import React from "react";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageCount,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pageCount) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center mt-16 mb-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 border rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Previous
      </button>

      {/* Show first page button */}
      {currentPage > 3 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 mx-1 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            1
          </button>
          {currentPage > 4 && (
            <span className="px-4 py-2 mx-1 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Page number buttons */}
      {Array.from(
        { length: Math.min(5, pageCount) },
        (_, i) => i + Math.max(currentPage - 2, 1)
      )
        .filter((page) => page <= pageCount)
        .map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 mx-1 border rounded-md ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
          >
            {page}
          </button>
        ))}

      {/* Show last page button */}
      {currentPage < pageCount - 2 && (
        <>
          {currentPage < pageCount - 3 && (
            <span className="px-4 py-2 mx-1 text-gray-500">...</span>
          )}
          <button
            onClick={() => handlePageChange(pageCount)}
            className="px-4 py-2 mx-1 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            {pageCount}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className={`px-4 py-2 mx-1 border rounded-md ${
          currentPage === pageCount
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
