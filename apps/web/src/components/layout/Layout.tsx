import React from "react";
import Header from "../header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow pt-16 bg-gray-100">
        <div className="max-w-7xl mx-auto mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
