import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";

import { ProfessionalList } from "../professional/search/ProfessionalList";
import { Professional, professionalApi } from "../../api/professional";

const ProfessionalRecommendations: React.FC = () => {
    const LIMIT = 25; // Number of results per page
    const [professionals, setProfessionals] = useState<Professional[]>([]); // State to store the list of professionals
    const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
    const [loading, setLoading] = useState(false); // State to handle loading status
    const [offset, setOffset] = useState(0);

    const fetchRecommendations = async (offset: number, limit: number) => {
        setLoading(true);
        let professionals = await professionalApi.getRecommendedProfessionals(
            (currentPage - 1) * LIMIT, // Calculate offset for pagination
            LIMIT // Limit the number of results per page
        );
        if (professionals) {
            setProfessionals(
                professionals.map((p) => {
                    return {
                        ...p,
                        rating: (Math.random() * 5).toString(),
                        currency: "INR",
                        user: {
                            ...p.user,
                            avatar: `https://i.pravatar.cc/150?u=${p.user.email}`,
                        },
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
                    <ProfessionalList professionals={professionals} />
                )}
            </div>
        </div>
    );
};

export default ProfessionalRecommendations;
