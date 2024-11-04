import React from 'react';
import ExerciseItem from './Exercise/ExerciseItem';
import './ExercisesSection.css';

const ExercisesSection = ({ exercises }) => {
  return (
    <div className="exercises-section">
      <h2>Exercises</h2>
      <div className="exercises-list">
        {exercises.map((exercise) => (
          <ExerciseItem
            exercise={ exercise}
          />
        ))}
      </div>
    </div>
  );
};

export default ExercisesSection;
