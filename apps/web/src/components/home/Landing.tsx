import React from "react";

import FeaturesSection from "./Features";
import Hero from "../landing/Hero";
import Testimonial from "../landing/Testimonial";
import CallToAction from "../landing/CallToAction";
import Footer from "../landing/Footer";

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
