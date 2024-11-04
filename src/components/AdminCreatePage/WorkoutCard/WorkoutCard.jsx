import React from 'react';
import "./WorkoutCard"

const WorkoutCard = ({ workoutData, exerciseList }) => {
  return (
    <div className="workout-card">
      <div className="workout-image-container">
        {workoutData.picture ? (
          <img src={workoutData.picture} alt="Workout" className="workout-image" />
        ) : (
          <p>No Image Added</p>
        )}
      </div>
      <h3>{workoutData.name || 'Title'}</h3>
      <p>{workoutData.description || 'This place here is for the description'}</p>
      <ul>
        {exerciseList.length > 0
          ? exerciseList.map((exercise, index) => <li key={index}>{exercise}</li>)
          : <li>No Exercises Added</li>
        }
      </ul>
    </div>
  );
};

export default WorkoutCard;
