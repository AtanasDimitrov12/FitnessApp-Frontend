import React from 'react';
import "./WorkoutCard.css";

const WorkoutCard = ({ workoutData }) => {
  if (!workoutData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-card-User">
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
        {workoutData.exerciseList && workoutData.exerciseList.length > 0 ? (
          workoutData.exerciseList.map((exercise, index) => (
            <li key={index}>
              {exercise.name} - {exercise.sets} sets, {exercise.reps} reps
            </li>
          ))
        ) : (
          <li>No Exercises Added</li>
        )}
      </ul>
    </div>
  );
};

export default WorkoutCard;
