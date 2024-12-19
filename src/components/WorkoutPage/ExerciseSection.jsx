import React from 'react';
import './ExercisesSection.css';

const ExercisesSection = ({ exercises = [], onExerciseSelect }) => {
  // Fallback message if exercises are not available
  if (!exercises || exercises.length === 0) {
    return <div className="exercises-section">No exercises available</div>;
  }

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
