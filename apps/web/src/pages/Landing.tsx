import React from "react";

import FeaturesSection from "../components/landing/Features";
import Hero from "../components/landing/Hero";
import Testimonial from "../components/landing/Testimonial";
import CallToAction from "../components/landing/CallToAction";
import Footer from "../components/landing/Footer";

const Landing: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <Testimonial />

      {/* Call to Action Section */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
