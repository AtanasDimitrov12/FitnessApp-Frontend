import React from 'react';

function FeatureCard({ title, description}) {
  return (
    <div className="feature">
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
  );
}

export default FeatureCard;