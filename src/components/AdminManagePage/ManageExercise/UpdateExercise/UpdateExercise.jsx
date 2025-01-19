import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateExercise } from '../../../../repositories/ExerciseRepo';
import { toast } from 'react-toastify';
import './UpdateExercise.css';

const muscleGroups = [
  { label: "Back", value: "BACK" },
  { label: "Cardio", value: "CARDIO" },
  { label: "Chest", value: "CHEST" },
  { label: "Lower Arms", value: "LOWER_ARMS" },
  { label: "Lower Legs", value: "LOWER_LEGS" },
  { label: "Neck", value: "NECK" },
  { label: "Shoulders", value: "SHOULDERS" },
  { label: "Upper Arms", value: "UPPER_ARMS" },
  { label: "Upper Legs", value: "UPPER_LEGS" },
  { label: "Abs", value: "ABS" },
  { label: "Lats", value: "LATS" },
  { label: "Pectorals", value: "PECTORALS" },
  { label: "Waist", value: "WAIST" }
];

const UpdateExercise = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const exercise = location.state?.exercise || {}; // Get exercise from state
  const [exerciseData, setExerciseData] = useState(exercise); // Initialize form with exercise data

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
      const response = await updateExercise(exerciseData);
      if (response) {
        toast.success('Exercise updated successfully!', { position: 'top-right' });
        navigate('/admin-manage'); // Redirect on success
      } else {
        toast.error('Failed to update exercise.', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error updating exercise:', error);
      toast.error('An error occurred while updating the exercise.', { position: 'top-right' });
    }
  };

  return (
    <div className="update-exercise update-exercise-container">
      <h3>Update Exercise</h3>
      <form onSubmit={handleSubmit} className="update-exercise-form">
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
          {muscleGroups.map((group) => (
            <option key={group.value} value={group.value}>
              {group.label}
            </option>
          ))}
        </select>

        <button type="submit" className="exercise-update-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateExercise;
