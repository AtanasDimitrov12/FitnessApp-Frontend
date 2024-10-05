import React from "react";
import "./WorkoutCard.css"; // Import the external CSS file

const WorkoutCard = ({ workout }) => {
  const { name, description, exercises } = workout;

  return (
    <div className="workout-card">
      {/* Placeholder Image - Replace with actual workout image */}
      <img
        className="workout-image"
        src="/images/workout-card.jpg"
        alt={`${name} image`}
      />
      <h2 className="workout-title">{name}</h2>
      <p className="workout-description">{description}</p>
      <h3 className="workout-exercises-title">Exercises:</h3>
      <ul className="workout-exercises-list">
        {exercises.map((exercise, index) => (
          <li key={index} className="workout-exercise-item">
            {exercise.name}
          </li>
        ))}
      </ul>
      {/* Details button */}
      <button className="details-button">Details</button>
    </div>
  );
};

export default WorkoutCard;
