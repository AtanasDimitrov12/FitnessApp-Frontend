import React from 'react';
import WorkoutCard from '../WorkoutCard/WorkoutCard';

const Preview = ({ workoutData, exerciseList, imageFile }) => {
  return (
    <div className="preview-container">
      <h3>Preview</h3>
      <WorkoutCard workoutData={workoutData} exerciseList={exerciseList} imageFile={imageFile} />
    </div>
  );
};

export default Preview;
