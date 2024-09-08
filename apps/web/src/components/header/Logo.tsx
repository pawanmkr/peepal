import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import peepal from "../../assets/Logo/peepal.png";

interface LogoProps {
  className?: string;
}

const gotoHome = () => {
  window.location.href = "/";
};

const Logo: React.FC<LogoProps> = ({ className }) => {
  const location = useLocation(); // Get the current route
  const showLeaf = location.pathname === "/" ? true : false;

  return (
    <div
      className={`text-2xl font-bold cursor-pointer flex items-center justify-center ${className}`}
      onClick={gotoHome}
    >
      {showLeaf && (
        <img
          src={peepal}
          width={60}
          alt="Peepal Leaf"
          className="mr-2"
          style={{
            filter: `invert(1) grayscale(1) brightness(10)`,
          }}
        />
      )}
      <span>Peepal</span>
    </div>
  );
};

export default Logo;
