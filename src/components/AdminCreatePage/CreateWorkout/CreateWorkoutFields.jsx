import React from 'react';

const CreateWorkoutFields = ({ onAddExercise, onAddPicture, onInputChange }) => {
  return (
    <div className="create-workout-fields">
      <h3>Create Workout</h3>
      <form>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={onInputChange}
          required
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          onChange={onInputChange}
          required
        />
        
        <div className="button-group">
          <button type="button" onClick={onAddExercise} className="add-button">Add exercises</button>
          
          <label htmlFor="upload-picture" className="add-button">Add picture</label>
          <input
            type="file"
            id="upload-picture"
            accept="image/jpeg, image/png"
            onChange={onAddPicture}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateWorkoutFields;
