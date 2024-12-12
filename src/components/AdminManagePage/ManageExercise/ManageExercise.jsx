import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ExerciseCard from './ExerciseCard/ExerciseCard';
import { getAllExercises, deleteExercise } from '../../../repositories/ExerciseRepo';
import './ManageExercise.css';

const ManageExercise = () => {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch all exercises on component mount
  useEffect(() => {
    const fetchExercises = async () => {
      const fetchedExercises = await getAllExercises();
      if (fetchedExercises) {
        setExercises(fetchedExercises.reverse()); // Reverse to show newest at the top
      } else {
        console.error('Failed to fetch exercises.');
      }
    };

    fetchExercises();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const isDeleted = await deleteExercise(id);
    if (isDeleted) {
      setExercises((prevExercises) => prevExercises.filter((exercise) => exercise.id !== id));
    } else {
      console.error('Failed to delete exercise.');
    }
  };

  // Handle edit
  const handleEdit = (exercise) => {
    navigate('/update-exercise', { state: { exercise } }); // Redirect to UpdateExercise with the exercise object
  };

  return (
    <div className="manage-exercise-page">
      <div className="manage-exercise-content">
        <h2 className="page-title">Manage Exercises</h2>
        <div className="manage-exercise-list">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onDelete={() => handleDelete(exercise.id)}
              onEdit={() => handleEdit(exercise)} // Pass the full exercise object
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageExercise;
