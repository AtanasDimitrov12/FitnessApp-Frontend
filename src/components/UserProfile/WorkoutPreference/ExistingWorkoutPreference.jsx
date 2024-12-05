import React from 'react';
import './WorkoutPreference.css';

const ExistingWorkoutPreference = ({ workoutPreference, onCreateNew }) => {
  return (
    <div className="existing-workout-preference">
      <h3>Your Existing Preference</h3>
      <div className="preference-details">
        <p><strong>Goal:</strong> {workoutPreference.fitnessGoal}</p>
        <p><strong>Current fitness level:</strong> {workoutPreference.fitnessLevel}</p>
        <p><strong>Training style:</strong> {workoutPreference.preferredTrainingStyle}</p>
        <p><strong>Workouts per week:</strong> {workoutPreference.daysAvailable}</p>
        <button className="create-button" onClick={onCreateNew}>Create new</button>
      </div>
    </div>
  );
};

export default ExistingWorkoutPreference; 
