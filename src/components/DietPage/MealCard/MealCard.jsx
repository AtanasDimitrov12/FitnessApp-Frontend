import React from 'react';
import "./MealCard.css";

const MealCard = ({ image, name, cookingTime, calories, protein, carbs }) => {
  return (
    <div className="meal-card">
      <img src={image} alt={`${name}`} className="meal-image" />
      <h3>{name}</h3>
      <p>Cooking time: {cookingTime} minutes</p>
      <p>Calories: {calories} kcal</p>
      <p>Protein: {protein} g</p>
      <p>Carbs: {carbs} g</p>
    </div>
  );
};

export default MealCard;
