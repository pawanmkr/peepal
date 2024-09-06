import React from 'react';
import './TrendingTutors.css';

const TrendingTutors: React.FC = () => {
  const tutors = ['John Doe', 'Jane Smith', 'Mike Johnson'];

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Trending Tutors</h5>
        <ul className="list-group list-group-flush">
          {tutors.map((tutor, index) => (
            <li key={index} className="list-group-item">{tutor}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrendingTutors;
