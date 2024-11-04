import React, { useState } from 'react';
import ExistingWorkoutPreference from './ExistingWorkoutPreference';
import CreateWorkoutPreference from './CreateWorkoutPreference';
import './WorkoutPreference.css';

const WorkoutPreference = () => {
  const [hasPreference, setHasPreference] = useState(true); // Toggle to show if a workout preference exists

  return (
    <div className="workout-preference">
      {hasPreference ? (
        <ExistingWorkoutPreference onCreateNew={() => setHasPreference(false)} />
      ) : (
        <CreateWorkoutPreference onSubmit={() => setHasPreference(true)} />
      )}
    </div>
  );
};

export default WorkoutPreference;