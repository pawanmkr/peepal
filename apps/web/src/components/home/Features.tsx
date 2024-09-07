import React from "react";
import {
  FaUser,
  FaCalendarCheck,
  FaLightbulb,
  FaComments,
} from "react-icons/fa";

const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">
          What You Can Do on Our Platform
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <FaUser className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Find Experts</h3>
            <p>
              Search for professionals and mentors in your area of interest.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <FaCalendarCheck className="text-green-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Book Sessions</h3>
            <p>
              Schedule one-on-one consultations and get personalized advice.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <FaLightbulb className="text-yellow-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
            <p>Receive expert guidance tailored to your specific needs.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <FaComments className="text-red-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Engage in Discussions
            </h3>
            <p>Have meaningful conversations with industry professionals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
