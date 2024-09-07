import React from "react";
import { FaArrowRight } from "react-icons/fa";

const CallToAction = () => {
  return (
    <>
      <div className="bg-blue-600 text-white text-center py-12">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Connect with Experts?
        </h2>
        <p className="text-lg mb-6">
          Sign up now to start finding and booking consultations with
          professionals in your field.
        </p>
        <a
          href="/signup"
          className="bg-yellow-500 text-blue-600 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-300"
        >
          Join Us Today <FaArrowRight className="inline ml-2" />
        </a>
      </div>
    </>
  );
};

export default CallToAction;
