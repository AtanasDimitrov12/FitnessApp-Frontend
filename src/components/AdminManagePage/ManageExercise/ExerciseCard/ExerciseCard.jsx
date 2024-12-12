import React from 'react';
import './ExerciseCard.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ExerciseCard = ({ exercise, onEdit, onDelete }) => {
  const { name, sets, reps, muscleGroup } = exercise;

  return (
    <div className="exercise-card">
      <div className="exercise-card-header">
        <h3>{name}</h3>
        <button className="edit-button" onClick={onEdit} title="Edit">
          <FaEdit />
        </button>
      </div>
      <div className="exercise-card-body">
        <p><strong>Sets:</strong> {sets}</p>
        <p><strong>Reps:</strong> {reps}</p>
        <p><strong>Muscle Group:</strong> {muscleGroup}</p>
      </div>
      <button className="delete-button" onClick={onDelete} title="Delete">
        <FaTrash />
      </button>
    </div>
  );
};

export default ExerciseCard;