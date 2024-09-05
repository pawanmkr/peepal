import React from 'react';
import './TrendingSkills.css';

const TrendingSkills: React.FC = () => {
  const skills = ['React', 'Node.js', 'Java', 'AWS'];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">Trending Skills</h5>
        <ul className="list-group list-group-flush">
          {skills.map((skill, index) => (
            <li key={index} className="list-group-item">{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrendingSkills;
