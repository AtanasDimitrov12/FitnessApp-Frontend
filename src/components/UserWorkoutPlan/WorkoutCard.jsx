import React from "react";
import "./WorkoutCard.css";

const WorkoutCard = ({ workout, onDelete }) => {
  const { name, description, pictureURL, exercises } = workout;

  const handleDelete = () => {
    onDelete(workout.id); 
  };

  return (
    <div className="workout-card">
      <img
        className="workout-image"
        src={pictureURL}
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
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default WorkoutCard;
