import React from 'react';
import './ExerciseItem.css';

const ExerciseItem = ({ exercise}) => {
  if (!exercise) return null; 
  
  return (
    <div
      className="exercise-item-workout"
    >
      <div>
        <h5>{exercise.name}</h5>
        <p>{exercise.sets} sets, {exercise.reps} reps</p>
      </div>
    </div>
  );
};

export default ExerciseItem;
