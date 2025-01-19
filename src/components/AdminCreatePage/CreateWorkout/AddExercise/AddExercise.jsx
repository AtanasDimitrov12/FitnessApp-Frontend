import React, { useState, useEffect } from 'react';
import { getAllExercises } from '../../../../repositories/ExerciseRepo'; // Import getAllExercises from ExerciseRepo
import ExerciseItem from './ExerciseItem';
import './AddExercise.css';

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

const AddExercise = ({ onSave }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExerciseIds, setSelectedExerciseIds] = useState([]);
  const [muscleFilter, setMuscleFilter] = useState([]);
  const [exercises, setExercises] = useState([]); // Initialize exercises state for fetched data
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      const data = await getAllExercises(); // Use the getAllExercises function
      if (data) {
        setExercises(data); // Set the exercises data from the response
      } else {
        setError('Failed to load exercises.');
      }
    };

    fetchExercises();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleAddExercise = (id) => {
    if (!selectedExerciseIds.includes(id)) {
      setSelectedExerciseIds([...selectedExerciseIds, id]);
    }
  };

  const handleRemoveExercise = (id) => {
    setSelectedExerciseIds(selectedExerciseIds.filter((exerciseId) => exerciseId !== id));
  };

  const handleMuscleFilterChange = (group) =>
    setMuscleFilter((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );

  const filteredExercises = exercises.filter(
    (exercise) =>
      (!searchQuery || exercise.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!muscleFilter.length || muscleFilter.includes(exercise.muscleGroup)) // Ensure filtering matches enum values
  );

  const handleDone = () => {
    onSave(selectedExerciseIds); // Pass only the exercise IDs back to the previous page
  };

  return (
    <div className="add-exercise-page">
      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
      
      {/* Search and Filter Sidebar */}
      <div className="search-and-filter">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <div className="muscle-filter">
          <h4>Filter by muscle group</h4>
          {muscleGroups.map((group) => (
            <label key={group.value}>
              <input
                type="checkbox"
                checked={muscleFilter.includes(group.value)}
                onChange={() => handleMuscleFilterChange(group.value)}
              />
              {group.label}
            </label>
          ))}
        </div>
      </div>

      {/* Exercise List */}
      <div className="exercise-list">
        {filteredExercises.map((exercise) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            onAdd={handleAddExercise}
          />
        ))}
      </div>

      {/* Selected Exercises and Done Button */}
      <div className="exercise-basket">
        <h4>Selected Exercises:</h4>
        <ul>
          {selectedExerciseIds.map((id) => {
            const exercise = exercises.find((ex) => ex.id === id);
            return (
              <li key={id}>
                {exercise.name} - {exercise.sets} sets, {exercise.reps} reps
                <button onClick={() => handleRemoveExercise(id)}>Remove</button>
              </li>
            );
          })}
        </ul>
        <p>Total: {selectedExerciseIds.length} exercises</p>
        <button onClick={handleDone} className="done-button">Done</button>
      </div>
    </div>
  );
};

export default AddExercise;
