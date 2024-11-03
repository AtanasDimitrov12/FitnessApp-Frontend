import React from 'react';
import './WorkoutPreference.css';

const ExistingWorkoutPreference = ({ onCreateNew }) => {
  return (
    <div className="existing-workout-preference">
      <h3>Your Existing Preference</h3>
      <div className="preference-details">
        <p><strong>Goal:</strong> Muscle gain</p>
        <p><strong>Current fitness level:</strong> Intermediate</p>
        <p><strong>Training style:</strong> Strength</p>
        <p><strong>Workouts per week:</strong> 4</p>
        <button className="create-button" onClick={onCreateNew}>Create new</button>
      </div>
    </div>
  );
};

export default ExistingWorkoutPreference;
