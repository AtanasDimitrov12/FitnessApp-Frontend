import React from 'react';
import "./WorkoutCard.css";

const WorkoutCard = ({ workoutData, exerciseList, imageFile, pictureURL }) => {
  const imageSrc = imageFile
    ? URL.createObjectURL(imageFile)
    : pictureURL || null;

  return (
    <div className="workout-card">
      {/* Workout Image Section */}
      <div className="workout-image-container">
        {imageSrc ? (
          <img src={imageSrc} alt="Workout" className="workout-image" />
        ) : (
          <p>No Image Added</p>
        )}
      </div>

      {/* Workout Title */}
      <h3>{workoutData.name || 'Title'}</h3>

      {/* Workout Description */}
      <p>{workoutData.description || 'This place here is for the description'}</p>

      {/* Exercise List */}
      <ul>
        {exerciseList.length > 0 ? (
          exerciseList.map((exercise, index) => (
            <li key={index}>{exercise.name}</li>
          ))
        ) : (
          <li>No Exercises Added</li>
        )}
      </ul>
    </div>
  );
};

export default WorkoutCard;
