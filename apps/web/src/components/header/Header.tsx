import React from 'react';
import './Header.css';
import { FaUserCircle, FaBell } from 'react-icons/fa'; // Import Font Awesome icons

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="header-left">
        {/* Default Logo */}
        <div className="logo">LOGO</div>
        
        {/* Add some distance between the logo and search bar */}
        <input type="text" className="search-bar" placeholder="Search..." />
      </div>
      <div className="header-right">
        {/* Notification Icon */}
        <div className="notification-icon">
          <FaBell />
        </div>
        {/* User Profile Icon */}
        <div className="profile-icon">
          <FaUserCircle />
        </div>
      </div>
    </header>
  );
};

export default Header;

