import React from "react";
import "./WorkoutCard.css"; 

const WorkoutCard = ({ workout }) => {
  const { name, description, pictureURL, exercises } = workout;

  

  return (
    <div className="workout-card">
      
      <img
        className="workout-image"
        src= {pictureURL}
        alt={`${name} image`}
      />
      <h2 className="workout-title">{name}</h2>
      <p className="workout-description">{description}</p>
      <h3 className="workout-exercises-title">Exercises:</h3>
      <ul className="workout-exercises-list">
        {exercises.map((exercise, index) => (
          <li key={index} className="workout-exercise-item">
            {exercise}
          </li>
        ))}
      </ul>
      
      <button className="details-button">Details</button>
    </div>
  );
};

export default WorkoutCard;
