import React from "react";
import {
    FaUser,
    FaCalendarCheck,
    FaLightbulb,
    FaComments,
} from "react-icons/fa";

const FeaturesSection: React.FC = () => {
    return (
        <div className="bg-gray-100 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">
                    How Peepal helps you?
                </h2>
                {/* Add highlighted description here */}
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
                    <span className="font-semibold text-gray-800">
                        Peepal is your gateway
                    </span>{" "}
                    to meaningful conversations with experts from diverse
                    industries. Whether it’s{" "}
                    <span className="text-blue-600 font-semibold">
                        personalized advice
                    </span>
                    ,{" "}
                    <span className="text-green-600 font-semibold">
                        legal consultations
                    </span>
                    , or{" "}
                    <span className="text-yellow-600 font-semibold">
                        career guidance
                    </span>
                    , Peepal connects you with professionals who can provide
                    real-time insights and actionable advice. No more searching
                    through endless online professionalials—find the right
                    people and{" "}
                    <span className="font-semibold text-blue-600">
                        start a conversation
                    </span>{" "}
                    that truly matters.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
                        <FaUser className="text-blue-500 text-4xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Find Experts
                        </h3>
                        <p className="text-center">
                            Search for professionals and mentors in your area of
                            interest.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
                        <FaCalendarCheck className="text-green-500 text-4xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Book Sessions
                        </h3>
                        <p className="text-center">
                            Schedule one-on-one consultations and get
                            personalized advice.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
                        <FaLightbulb className="text-yellow-500 text-4xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Get Insights
                        </h3>
                        <p className="text-center">
                            Receive expert guidance tailored to your specific
                            needs.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
                        <FaComments className="text-red-500 text-4xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Engage in Discussions
                        </h3>
                        <p className="text-center">
                            Have meaningful conversations with industry
                            professionals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;
