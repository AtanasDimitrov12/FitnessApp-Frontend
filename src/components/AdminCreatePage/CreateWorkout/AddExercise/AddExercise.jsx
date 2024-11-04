import React, { useState } from 'react';
import ExerciseItem from './ExerciseItem';
import './AddExercise.css';

const AddExercise = ({ onSave }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExerciseIds, setSelectedExerciseIds] = useState([]);
  const [muscleFilter, setMuscleFilter] = useState([]);
  const [exercises] = useState([
    { id: 1, name: 'Bench Press', sets: 3, reps: 12, group: 'Chest' },
    { id: 2, name: 'Squat', sets: 4, reps: 10, group: 'Legs' },
    { id: 3, name: 'Deadlift', sets: 4, reps: 8, group: 'Back' },
    { id: 4, name: 'Shoulder Press', sets: 3, reps: 12, group: 'Shoulders' },
    { id: 5, name: 'Squat', sets: 4, reps: 10, group: 'Legs' },
    { id: 6, name: 'Deadlift', sets: 4, reps: 8, group: 'Back' },
    { id: 7, name: 'Shoulder Press', sets: 3, reps: 12, group: 'Shoulders' },
    // Add more exercises as needed
  ]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleAddExercise = (id) => {
    if (!selectedExerciseIds.includes(id)) {
      setSelectedExerciseIds([...selectedExerciseIds, id]);
    }
  };
  const handleRemoveExercise = (id) =>
    setSelectedExerciseIds(selectedExerciseIds.filter((exerciseId) => exerciseId !== id));

  const handleMuscleFilterChange = (group) =>
    setMuscleFilter((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );

  const filteredExercises = exercises.filter(
    (exercise) =>
      (!searchQuery || exercise.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!muscleFilter.length || muscleFilter.includes(exercise.group))
  );

  const handleDone = () => {
    onSave(selectedExerciseIds); // Pass only the exercise IDs back to the previous page
  };

  return (
    <div className="add-exercise-page">
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
