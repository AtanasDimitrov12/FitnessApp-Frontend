import React, { useState } from "react";
import "./CreateWorkout.css"; // External CSS for CreateWorkout page styling

const CreateWorkout = () => {
  // State for workout fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([{ name: "" }]); // Exercises as an array of objects

  // Handle input for workout name
  const handleNameChange = (e) => setName(e.target.value);

  // Handle input for workout description
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Handle input change for exercises
  const handleExerciseChange = (index, event) => {
    const newExercises = [...exercises];
    newExercises[index].name = event.target.value;
    setExercises(newExercises);
  };

  // Add a new exercise input field
  const addExercise = () => {
    setExercises([...exercises, { name: "" }]);
  };

  // Remove an exercise input field
  const removeExercise = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = {
      name,
      description,
      exercises,
    };
    console.log("Workout Created:", workout);
    // You can make an API call here to save the workout to the backend
  };

  return (
    <div className="create-workout-page">
      <h1 className="page-title">Create a New Workout</h1>
      <form className="create-workout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Workout Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter workout name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Workout Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter workout description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Exercises</label>
          {exercises.map((exercise, index) => (
            <div key={index} className="exercise-input">
              <input
                type="text"
                value={exercise.name}
                onChange={(e) => handleExerciseChange(index, e)}
                placeholder={`Exercise ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => removeExercise(index)}
                className="remove-exercise"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addExercise} className="add-exercise">
            Add Exercise
          </button>
        </div>

        <button type="submit" className="create-workout-button">
          Create Workout
        </button>
      </form>
    </div>
  );
};

export default CreateWorkout;
