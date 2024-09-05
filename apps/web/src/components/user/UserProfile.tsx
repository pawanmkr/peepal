import React from 'react';
import './UserProfile.css';

const UserProfile: React.FC = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="text-center">
          <img src="https://via.placeholder.com/100" alt="User Profile" className="rounded-circle" />
        </div>
        <h5 className="card-title text-center mt-3">John Doe</h5>
        <p className="card-text text-center">@johndoe</p>
        <p className="card-text text-center">Developer</p>
        <p className="card-text text-center">College Name</p>
        <p className="card-text text-center">Company Name</p>
        <p className="card-text text-center">Location</p>
        <a href="https://linkedin.com" className="btn btn-primary btn-block">LinkedIn Profile</a>
      </div>
    </div>
  );
};

export default UserProfile;
