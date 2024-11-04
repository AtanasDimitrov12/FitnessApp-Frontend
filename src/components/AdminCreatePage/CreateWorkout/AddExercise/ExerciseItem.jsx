import React from 'react';
import './ExerciseItem.css';

const ExerciseItem = ({ exercise, onAdd }) => {
  return (
    <div
      className="exercise-item"
      onClick={() => onAdd(exercise.id)}
    >
      <div>
        <h5>{exercise.name}</h5>
        <p>{exercise.sets} sets, {exercise.reps} reps</p>
      </div>
    </div>
  );
};

export default ExerciseItem;
