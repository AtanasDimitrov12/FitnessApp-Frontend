import React, { useState } from 'react';
import './AddExercise.css';

const AddExercise = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [muscleFilter, setMuscleFilter] = useState([]);
  const [exercises] = useState([
    { id: 1, name: 'Bench Press', sets: 3, reps: 12, group: 'Chest' },
    { id: 2, name: 'Squat', sets: 4, reps: 10, group: 'Legs' },
    { id: 3, name: 'Deadlift', sets: 4, reps: 8, group: 'Back' },
    { id: 4, name: 'Shoulder Press', sets: 3, reps: 12, group: 'Shoulders' },
    // Add more exercises as needed
  ]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleAddExercise = (exercise) => setSelectedExercises([...selectedExercises, exercise]);
  const handleRemoveExercise = (id) =>
    setSelectedExercises(selectedExercises.filter((exercise) => exercise.id !== id));
  const handleMuscleFilterChange = (group) =>
    setMuscleFilter((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );

  const filteredExercises = exercises.filter(
    (exercise) =>
      (!searchQuery || exercise.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!muscleFilter.length || muscleFilter.includes(exercise.group))
  );

  return (
    <div className="add-exercise-page">
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
          {['Legs', 'Chest', 'Back', 'Shoulders'].map((group) => (
            <label key={group}>
              <input
                type="checkbox"
                checked={muscleFilter.includes(group)}
                onChange={() => handleMuscleFilterChange(group)}
              />
              {group}
            </label>
          ))}
        </div>
      </div>

      <div className="exercise-list">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="exercise-item"
            onMouseEnter={() => setHoveredExercise(exercise.id)}
            onMouseLeave={() => setHoveredExercise(null)}
          >
            <div>
              <h5>{exercise.name}</h5>
              <p>{exercise.sets} sets, {exercise.reps} reps</p>
            </div>
            <button
              className="add-button"
              onClick={() => handleAddExercise(exercise)}
            >
              +
            </button>
          </div>
        ))}
      </div>

      <div className="exercise-basket">
        <h4>Selected Exercises:</h4>
        <ul>
          {selectedExercises.map((exercise) => (
            <li key={exercise.id}>
              {exercise.name} - {exercise.sets} sets, {exercise.reps} reps
              <button onClick={() => handleRemoveExercise(exercise.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: {selectedExercises.length} exercises</p>
      </div>
    </div>
  );
};

export default AddExercise;
