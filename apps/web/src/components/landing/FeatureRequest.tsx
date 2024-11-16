import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaPlus, FaTimes, FaChevronRight } from "react-icons/fa";

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
  const [validationMessage, setValidationMessage] = useState("");

  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement)[]>([]);

  // Fetch the feature requests and store them
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const initialData = response.data.slice(0, 30).map((item) => ({
          ...item,
          likes: 0,
          dislikes: 0,
        }));
        setRequests(initialData);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle form data changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    // Validation for each step
    const fieldName = ["user_name", "email", "request_title", "request_description"][formStep];
    const fieldValue = formData[fieldName];

    if (!fieldValue.trim()) {
      setValidationMessage(`Please add your ${fieldName.replace("_", " ")}`);
      return;
    }

    if (fieldName === "email" && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(fieldValue)) {
      setValidationMessage("Please enter a valid email address.");
      return;
    }

    setValidationMessage("");
    if (formStep < 3) {
      setFormStep(formStep + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation before submitting
    if (!formData.user_name.trim()) {
      setValidationMessage("Please add your name.");
      return;
    }
    if (!formData.email.trim() || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      setValidationMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.request_title.trim()) {
      setValidationMessage("Please add a request title.");
      return;
    }
    if (!formData.request_description.trim()) {
      setValidationMessage("Please add a description.");
      return;
    }

    // Mock API call to submit the feature request
    console.log("Submitting request:", formData);
    
    // Simple alert after submitting the form
    alert("Feature request submitted successfully!");

    // Update the requests list and reset the form
    setRequests((prevRequests) => [
      ...prevRequests,
      { ...formData, id: prevRequests.length + 1, likes: 0, dislikes: 0 },
    ]);
    setFormData({ user_name: "", email: "", request_title: "", request_description: "" });
    setFormStep(0);
  };

  // Like and Dislike handlers
  const handleLike = (id: number) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, likes: request.likes + 1 } : request
      )
    );
  };

  const handleDislike = (id: number) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, dislikes: request.dislikes + 1 } : request
      )
    );
  };

  // Sorting should only happen after a page refresh (or when data is fetched)
  useEffect(() => {
    setRequests((prevRequests) => prevRequests.sort((a, b) => b.likes - a.likes));
  }, []); // Sorts only when the component is initially loaded or refreshed

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (formStep === 3) {
        handleSubmit(e as any); // Submit on the last step
      } else {
        handleNextStep(); // Move to next step
      }
    }
  };

  // Focus the first input after form becomes visible
  useEffect(() => {
    if (isFormVisible) {
      inputRefs.current[0]?.focus();
    }
  }, [isFormVisible]);

  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-[#2563eb]">Current Feature Requests</h3>
          <div className="relative group">
            <button
              onClick={() => {
                setIsFormVisible(true);
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
                  <FaArrowDown className="text-red-500" />
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
            <FaArrowLeft />
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
                    {validationMessage && formStep === 0 && (
                      <div className="text-red-500">{validationMessage}</div>
                    )}
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      ref={(el) => inputRefs.current.push(el!)}
                      className="p-2 border border-gray-300 rounded-md w-full"
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>

                {/* Step 2: Email */}
                <div className="chat-box">
                  <div className="question">
                    <span className="font-bold">What is your email?</span>
                  </div>
                  <div className="answer">
                    {validationMessage && formStep === 1 && (
                      <div className="text-red-500">{validationMessage}</div>
                    )}
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      ref={(el) => inputRefs.current.push(el!)}
                      className="p-2 border border-gray-300 rounded-md w-full"
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>

                {/* Step 3: Request Title */}
                <div className="chat-box">
                  <div className="question">
                    <span className="font-bold">What is the title of your request?</span>
                  </div>
                  <div className="answer">
                    {validationMessage && formStep === 2 && (
                      <div className="text-red-500">{validationMessage}</div>
                    )}
                    <input
                      type="text"
                      name="request_title"
                      value={formData.request_title}
                      onChange={handleInputChange}
                      ref={(el) => inputRefs.current.push(el!)}
                      className="p-2 border border-gray-300 rounded-md w-full"
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>

                {/* Step 4: Request Description */}
                <div className="chat-box">
                  <div className="question">
                    <span className="font-bold">Please describe your request.</span>
                  </div>
                  <div className="answer">
                    {validationMessage && formStep === 3 && (
                      <div className="text-red-500">{validationMessage}</div>
                    )}
                    <textarea
                      name="request_description"
                      value={formData.request_description}
                      onChange={handleInputChange}
                      ref={(el) => inputRefs.current.push(el!)}
                      className="p-2 border border-gray-300 rounded-md w-full"
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                  >
                    <FaChevronRight />
                  </button>

                  {formStep === 3 && (
                    <button
                      type="submit"
                      className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                    >
                      <FaChevronRight />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturesRequest;
