import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaArrowRight, FaArrowLeft, FaPlus, FaTimes, FaArrowUp, FaArrowDown } from "react-icons/fa";

const FeaturesRequest: React.FC = () => {
    const [requests, setRequests] = useState<any[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formStep, setFormStep] = useState(0);
    const [formData, setFormData] = useState({
        user_name: "",
        email: "",
        request_title: "",
        request_description: "",
    });
    const [submittedMessage, setSubmittedMessage] = useState(""); // State for form submission message

    const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement)[]>([]); // Reference to inputs for focusing

    useEffect(() => {
        // Mock API call to fetch initial list of feature requests
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                const initialData = response.data.slice(0, 30).map(item => ({
                    ...item,
                    likes: 0,
                    dislikes: 0
                }));
                setRequests(initialData);
            })
            .catch(err => console.error(err));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNextStep = () => {
        if (formStep < 3) {
            setFormStep(formStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (formStep > 0) {
            setFormStep(formStep - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock API call to submit the feature request
        console.log("Submitting request:", formData);
        setSubmittedMessage("Feature request submitted!");
        setRequests(prevRequests => [
            ...prevRequests,
            { ...formData, id: prevRequests.length + 1, likes: 0, dislikes: 0 }
        ]);
        setFormData({ user_name: "", email: "", request_title: "", request_description: "" });
        setIsFormVisible(false);
        setFormStep(0);
    };

    const handleLike = (id: number) => {
        setRequests(prevRequests => prevRequests.map(request =>
            request.id === id ? { ...request, likes: request.likes + 1 } : request
        ));
    };

    const handleDislike = (id: number) => {
        setRequests(prevRequests => prevRequests.map(request =>
            request.id === id ? { ...request, dislikes: request.dislikes + 1 } : request
        ));
    };

    // Sort requests by likes (high to low)
    const sortedRequests = [...requests].sort((a, b) => b.likes - a.likes);

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const indexOfLastRequest = currentPage * itemsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
    const currentRequests = sortedRequests.slice(indexOfFirstRequest, indexOfLastRequest);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if (formStep === 3) {
                handleSubmit(e as any);  // Submit on the last step
            } else {
                handleNextStep();  // Move to next step
            }
        }
    };

    return (
        <div className="bg-gray-100 py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-[#2563eb]">Current Feature Requests</h3>
                    <div className="relative group">
                        <button
                            onClick={() => {
                                setIsFormVisible(true);
                                setTimeout(() => inputRefs.current[0]?.focus(), 100);
                            }}
                            className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 flex items-center space-x-2"
                        >
                            <FaPlus /> {/* Add icon */}
                        </button>
                    </div>
                </div>

                {/* List of feature requests */}
                <ul className="space-y-4">
                    {currentRequests.map((request) => (
                        <li key={request.id} className="p-4 bg-white rounded-lg shadow-md">
                            <h4 className="text-lg font-semibold mb-2">{request.title}</h4>
                            <p>{request.body}</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <button onClick={() => handleLike(request.id)} className="flex items-center">
                                    <FaArrowUp className="text-blue-500" />
                                    <span className="ml-1">{request.likes}</span>
                                </button>
                                <button onClick={() => handleDislike(request.id)} className="flex items-center">
                                    <FaArrowDown className="text-red-500 " />
                                    <span className="ml-1">{request.dislikes}</span>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-2">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        <FaArrowRight className="rotate-180" />
                    </button>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastRequest >= requests.length}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        <FaArrowRight />
                    </button>
                </div>

                {/* Popup Form (Centered) */}
                {isFormVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
                            <button
                                onClick={() => setIsFormVisible(false)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            >
                                <FaTimes size={20} />
                            </button>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Step 1: User's name */}
                                <div className="chat-box">
                                    <div className="question">
                                        <span className="font-bold">What is your name?</span>
                                    </div>
                                    <div className="answer">
                                        <input
                                            type="text"
                                            id="user_name"
                                            name="user_name"
                                            value={formData.user_name}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                            required
                                            placeholder="Your name"
                                            ref={(el) => (inputRefs.current[0] = el)}  // Ref for focus
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                {/* Step 2: User's email */}
                                {formStep > 0 && (
                                    <div className="chat-box">
                                        <div className="question">
                                            <span className="font-bold">What is your email?</span>
                                        </div>
                                        <div className="answer">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                onKeyDown={handleKeyDown}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                                required
                                                placeholder="Your email"
                                                ref={(el) => (inputRefs.current[1] = el)}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Feature title */}
                                {formStep > 1 && (
                                    <div className="chat-box">
                                        <div className="question">
                                            <span className="font-bold">What is the title of the feature request?</span>
                                        </div>
                                        <div className="answer">
                                            <input
                                                type="text"
                                                id="request_title"
                                                name="request_title"
                                                value={formData.request_title}
                                                onChange={handleInputChange}
                                                onKeyDown={handleKeyDown}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                                required
                                                placeholder="Feature title"
                                                ref={(el) => (inputRefs.current[2] = el)}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Feature description */}
                                {formStep > 2 && (
                                    <div className="chat-box">
                                        <div className="question">
                                            <span className="font-bold">Describe the feature request</span>
                                        </div>
                                        <div className="answer">
                                            <textarea
                                                id="request_description"
                                                name="request_description"
                                                value={formData.request_description}
                                                onChange={handleInputChange}
                                                onKeyDown={handleKeyDown}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                                required
                                                placeholder="Feature description"
                                                ref={(el) => (inputRefs.current[3] = el)}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Back and Next or Submit Icons in the Center */}
                                <div className="flex justify-center mt-4 space-x-4">
                                   

                                    {formStep === 3 ? (
                                        <button
                                            type="submit"
                                            className="text-white hover:text-green-600"
                                        >
                                            <FaArrowRight className="text-green-500" />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            className="text-white hover:text-blue-600"
                                        >
                                            <FaArrowRight className="text-blue-500" />
                                        </button>
                                    )}
                                </div>
                            </form>

                            {/* Show submission message */}
                            {submittedMessage && (
                                <div className="text-green-500 text-center mt-4">{submittedMessage}</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturesRequest;
