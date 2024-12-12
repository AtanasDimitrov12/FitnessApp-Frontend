import React from 'react';
import './MealCard.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const MealCard = ({ meal, onEdit, onDelete }) => {
  const { name, calories, protein, carbs, cookingTime } = meal;

  return (
    <div className="meal-card">
      <div className="meal-card-header">
        <h3>{name}</h3>
        <button className="edit-button" onClick={onEdit} title="Edit">
          <FaEdit />
        </button>
      </div>
      <div className="meal-card-body">
        <p><strong>Calories:</strong> {calories} kcal</p>
        <p><strong>Protein:</strong> {protein} g</p>
        <p><strong>Carbs:</strong> {carbs} g</p>
        <p><strong>Cooking Time:</strong> {cookingTime} min</p>
      </div>
      <button className="delete-button" onClick={onDelete} title="Delete">
        <FaTrash />
      </button>
    </div>
  );
};

export default MealCard;
