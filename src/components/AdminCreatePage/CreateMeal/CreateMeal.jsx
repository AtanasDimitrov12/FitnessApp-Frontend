import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
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
      const result = await createNewMeal(mealData);
      if (result) {
        toast.success('Meal created successfully!', { position: "top-right", autoClose: 3000 });
        console.log('Meal created successfully:', result);

        // Clear the form after success
        setMealData({ name: '', calories: '', protein: '', carbs: '', cookingTime: '' });
      } else {
        toast.error('Failed to create meal. Please try again.', { position: "top-right", autoClose: 3000 });
        console.error('Failed to create meal');
      }
    } catch (error) {
      console.error('Error creating meal:', error);
      toast.error('An error occurred while creating meal. Check console for details.', { position: "top-right", autoClose: 4000 });
    }
  };

  return (
    <div className="create-meal-container">
      <ToastContainer /> {/* Ensure ToastContainer is included to display notifications */}
      
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
          type="number"
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
