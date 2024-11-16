import { useState } from "react";

export const Search: React.FC<{ onSearch: (query: string) => void }> = ({
    onSearch,
}) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-2 w-full">
            <div className="flex">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for users..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>
        </form>
    );
};
