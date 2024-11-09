import React from 'react';
import './ExercisesSection.css';

const ExercisesSection = ({ exercises, onExerciseSelect }) => {
  return (
    <div className="exercises-section">
      <h2>Exercises</h2>
      <div className="exercises-list">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="exercise-item"
            onClick={() => onExerciseSelect(exercise.name)}
          >
            <h3>{exercise.name}</h3>
            <p>Sets: {exercise.sets}</p>
            <p>Reps: {exercise.reps}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExercisesSection;
