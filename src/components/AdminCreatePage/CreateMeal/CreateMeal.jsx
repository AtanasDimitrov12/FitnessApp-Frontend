import React, { useState } from 'react';
import './CreateMeal.css';
import { createNewMeal } from '../../../repositories/MealRepo'; // Import the create function

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createNewMeal(mealData); // Call createNewMeal with mealData only
      if (result) {
        console.log('Meal created successfully:', result);
        // Optionally, clear the form after successful submission
        setMealData({ name: '', calories: '', protein: '', carbs: '', cookingTime: '' });
      } else {
        console.error('Failed to create meal');
      }
    } catch (error) {
      console.error('Error creating meal:', error);
    }
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
          type="number" // Change to number to match `double` type in backend
          id="cookingTime"
          name="cookingTime"
          value={mealData.cookingTime}
          onChange={handleChange}
          required
          min="0"
          step="0.1" // Allow decimal values
        />

        <button type="submit" className="create-button">Create</button>
      </form>
    </div>
  );
};

export default CreateMeal;
