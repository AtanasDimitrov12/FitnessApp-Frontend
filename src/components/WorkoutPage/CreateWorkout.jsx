import React, { useState } from "react";
import { createNewWorkout } from "../../repositories/WorkoutRepo"; 
import "./CreateWorkout.css"; 

const CreateWorkout = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([{ name: "" }]);
  const [image, setImage] = useState(null); 

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleExerciseChange = (index, event) => {
    const newExercises = [...exercises];
    newExercises[index].name = event.target.value;
    setExercises(newExercises);
  };
  
  const addExercise = () => setExercises([...exercises, { name: "" }]);
  const removeExercise = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };
  const handleImageChange = (e) => setImage(e.target.files[0]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    const formData = new FormData();
  
    
    const workoutDetails = {
      name: name,
      description: description,
      exercises: exercises.map(ex => ex.name), 
    };
  
    
    formData.append("workout", JSON.stringify(workoutDetails));  
    formData.append("image", image);  
  
    try {
      const response = await createNewWorkout(formData);  
      if (response) {
        alert("Workout created successfully!");
      } else {
        alert("Failed to create workout");
      }
    } catch (error) {
      console.error("Error creating workout:", error);
      alert("Error creating workout");
    }
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
          <label htmlFor="image">Workout Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange} 
            required
          />
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
