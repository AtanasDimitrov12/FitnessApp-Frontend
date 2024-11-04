import React, { useState } from 'react';
import './CreateMeal.css';

const CreateMeal = () => {
  const [mealData, setMealData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    cookingTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData({
      ...mealData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic (e.g., API call to save meal)
    console.log('Meal created:', mealData);
  };

  return (
    <div className="create-meal-container">
      <h3>Create Meal</h3>
      <form onSubmit={handleSubmit} className="create-meal-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={mealData.name}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="calories">Calories:</label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={mealData.calories}
          onChange={handleChange}
          required
          min="0"
        />
        
        <label htmlFor="protein">Protein:</label>
        <input
          type="number"
          id="protein"
          name="protein"
          value={mealData.protein}
          onChange={handleChange}
          required
          min="0"
        />
        
        <label htmlFor="carbs">Carbs:</label>
        <input
          type="number"
          id="carbs"
          name="carbs"
          value={mealData.carbs}
          onChange={handleChange}
          required
          min="0"
        />
        
        <label htmlFor="cookingTime">Cooking time:</label>
        <input
          type="text"
          id="cookingTime"
          name="cookingTime"
          value={mealData.cookingTime}
          onChange={handleChange}
          required
        />
        
        <button type="submit" className="create-button">Create</button>
      </form>
    </div>
  );
};

export default CreateMeal;
