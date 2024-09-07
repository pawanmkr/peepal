import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  return (
    <>
      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <FaQuoteLeft className="text-gray-500 text-2xl mb-4" />
              <p className="text-gray-700">
                “The best platform to connect with experts. I got invaluable
                advice from a top lawyer in just a matter of hours!”
              </p>
              <p className="font-semibold mt-2">Jane Doe</p>
              <p className="text-gray-500">Entrepreneur</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <FaQuoteLeft className="text-gray-500 text-2xl mb-4" />
              <p className="text-gray-700">
                “Amazing platform for career guidance. I spoke with an industry
                leader who provided clear direction for my next steps.”
              </p>
              <p className="font-semibold mt-2">John Smith</p>
              <p className="text-gray-500">Software Engineer</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <FaQuoteLeft className="text-gray-500 text-2xl mb-4" />
              <p className="text-gray-700">
                “Highly recommend for anyone seeking personalized advice. The
                experts are top-notch and very helpful.”
              </p>
              <p className="font-semibold mt-2">Emily Johnson</p>
              <p className="text-gray-500">Student</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
