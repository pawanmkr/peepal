import React, { useState } from 'react';
import { Search } from '../components/tutor/search/SearchBox';
import { TutorList } from '../components/tutor/search/TutorList';

export interface TutorBasicInfo {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    rating: string;
    description: string;
    skills: string;
    charge: string;
    currency: string;
    chargeType: string;
}

const TUTORS_PER_PAGE = 25;

export const TutorSearch: React.FC = () => {
    const [tutors, setTutors] = useState<TutorBasicInfo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [query, setQuery] = useState('');

    const handleSearch = (searchQuery: string) => {
        console.log('Searching for:', searchQuery);
        setQuery(searchQuery);

        // Mock data for demonstration
        const mockTutors = Array(25)
            .fill(null)
            .map((_, index) => ({
                id: `${index + 1}`,
                firstName: `John${index + 1}`,
                lastName: `Doe${index + 1}`,
                avatar: `https://i.pravatar.cc/300?img=${index + 1}`,
                rating: (4 + Math.random()).toFixed(1),
                description: `Experienced tutor ${index + 1}`,
                skills: 'Mathematics, Calculus, Algebra',
                charge: `${40 + index}`,
                currency: 'USD',
                chargeType: 'per hour',
            }));

        setTutors(mockTutors);
        setTotalResults(mockTutors.length);
        setCurrentPage(1); // Reset to the first page
    };

    const pageCount = Math.ceil(totalResults / TUTORS_PER_PAGE);

    const displayedTutors = tutors.slice(
        (currentPage - 1) * TUTORS_PER_PAGE,
        currentPage * TUTORS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to the top when changing pages
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow max-w-3xl mx-auto w-full">
                <div className="sticky top-0 z-10 bg-white border p-4 w-full mb-4">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold flex-grow-0 mr-8">Find a Tutor</h1>
                        <div className="flex-grow">
                            <Search onSearch={handleSearch} />
                        </div>
                    </div>
                    {totalResults > 0 && (
                        <p className="text-gray-600">
                            Found <span className="font-bold">{totalResults}</span> results for "
                            <span className="italic">{query}</span>"
                        </p>
                    )}
                </div>

                <TutorList tutors={displayedTutors} />

                {pageCount > 1 && (
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 mt-8">
                        <div className="max-w-3xl mx-auto flex justify-center space-x-2">
                            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === page
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
