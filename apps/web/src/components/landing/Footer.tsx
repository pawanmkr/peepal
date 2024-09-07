import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 YourAppName. All rights reserved.</p>
          <p>
            <a href="/contact" className="text-yellow-500 hover:underline">
              Contact Us
            </a>{" "}
            |{" "}
            <a href="/privacy" className="text-yellow-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
