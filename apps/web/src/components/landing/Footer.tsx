import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2024 Peepal. All rights reserved.</p>
          <p className="mb-4">
            <a
              href="/contact"
              className="text-yellow-500 hover:underline no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>{" "}
            -{" "}
            <a
              href="/privacy"
              className="text-yellow-500 hover:underline no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>{" "}
            -{" "}
            <a
              href="/terms"
              className="text-yellow-500 hover:underline no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{" "}
            -{" "}
            <a
              href="/feature-request"
              className="text-yellow-500 hover:underline no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feature Request
            </a>{" "}
            -{" "}
            <a
              href="/feedback"
              className="text-yellow-500 hover:underline no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feedback
            </a>
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Replace with actual social icon */}
              Facebook
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
