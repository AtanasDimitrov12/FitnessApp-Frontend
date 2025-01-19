import React from 'react';
import './NoPreference.css';

const NoPreference = ({ title, description, buttonText, onCreate }) => {
  return (
    <div className="no-preference-container">
      <div className="no-preference">
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="create-btn" onClick={onCreate}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default NoPreference;
