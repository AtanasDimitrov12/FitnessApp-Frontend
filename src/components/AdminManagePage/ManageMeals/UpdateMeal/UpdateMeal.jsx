import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateMeal } from '../../../../repositories/MealRepo';
import { toast } from 'react-toastify';
import './UpdateMeal.css';

const UpdateMeal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const meal = location.state?.meal || {}; // Get meal from state
  const [mealData, setMealData] = useState({
    ...meal,
    cookingTime: meal.cookingTime ? parseFloat(meal.cookingTime).toFixed(1) : '', // Round on initialization
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData((prevMealData) => ({
      ...prevMealData,
      [name]: name === 'cookingTime' ? parseFloat(value).toFixed(1) : value, // Round cookingTime
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedMeal = {
        ...mealData,
        cookingTime: parseFloat(mealData.cookingTime).toFixed(1), // Ensure cookingTime is rounded before submission
      };

      const response = await updateMeal(updatedMeal);
      if (response) {
        toast.success('Meal updated successfully!', { position: 'top-right' });
        navigate('/admin-manage'); // Redirect on success
      } else {
        toast.error('Failed to update meal.', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error updating meal:', error);
      toast.error('An error occurred while updating the meal.', { position: 'top-right' });
    }
  };

  return (
    <div className="update-meal update-meal-container">
      <h3>Update Meal</h3>
      <form onSubmit={handleSubmit} className="update-meal-form">
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

        <label htmlFor="cookingTime">Cooking Time:</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={mealData.cookingTime}
          onChange={handleChange}
          required
          min="0"
          step="0.1" // Allow fractional cooking times
        />

        <button type="submit" className="update-button">
          Update
        </button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default UpdateMeal;
