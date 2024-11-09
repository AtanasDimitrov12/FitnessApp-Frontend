import React, { useState } from 'react';
import { createExercise } from '../../../repositories/ExerciseRepo'; // Import the function
import './CreateExercise.css';

const CreateExercise = () => {
  const [exerciseData, setExerciseData] = useState({
    name: '',
    reps: '',
    sets: '',
    muscleGroup: ''
  });
  
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createExercise(exerciseData); // Call createExercise with form data
      if (response) {
        setStatusMessage('Exercise created successfully!');
        setExerciseData({ name: '', reps: '', sets: '', muscleGroup: '' }); // Reset form
      } else {
        setStatusMessage('Failed to create exercise.');
      }
    } catch (error) {
      console.error('Error creating exercise:', error);
      setStatusMessage('An error occurred while creating exercise.');
    }
  };

  return (
    <div className="create-exercise create-exercise-container">
      <h3>Create Exercise</h3>
      <form onSubmit={handleSubmit} className="create-exercise-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={exerciseData.name}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          id="reps"
          name="reps"
          value={exerciseData.reps}
          onChange={handleChange}
          required
          min="1"
        />
        
        <label htmlFor="sets">Sets:</label>
        <input
          type="number"
          id="sets"
          name="sets"
          value={exerciseData.sets}
          onChange={handleChange}
          required
          min="1"
        />
        
        <label htmlFor="muscleGroup">Muscle group:</label>
        <select
          id="muscleGroup"
          name="muscleGroup"
          value={exerciseData.muscleGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Muscle Group</option>
          <option value="Legs">Legs</option>
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Shoulders">Shoulders</option>
        </select>
        
        <button type="submit" className="create-button">Create</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>} {/* Display status message */}
    </div>
  );
};

export default CreateExercise;
