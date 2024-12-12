import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import MealCard from './MealCard/MealCard'; // Import MealCard component
import { getMeals, deleteMeal } from '../../../repositories/MealRepo'; // Meal repository methods
import './ManageMeal.css'; // Import CSS for ManageMeal

const ManageMeal = () => {
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch all meals on component mount
  useEffect(() => {
    const fetchMeals = async () => {
      const fetchedMeals = await getMeals();
      if (fetchedMeals) {
        setMeals(fetchedMeals.reverse()); // Reverse to show newest at the top
      } else {
        console.error('Failed to fetch meals.');
      }
    };

    fetchMeals();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const isDeleted = await deleteMeal(id);
    if (isDeleted) {
      setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
    } else {
      console.error('Failed to delete meal.');
    }
  };

  // Handle edit
  const handleEdit = (meal) => {
    navigate('/update-meal', { state: { meal } }); // Redirect to UpdateMeal with the meal object
  };

  return (
    <div className="manage-meal-page">
      <div className="manage-meal-content">
        <h2 className="page-title">Manage Meals</h2>
        <div className="manage-meal-list">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onDelete={() => handleDelete(meal.id)}
              onEdit={() => handleEdit(meal)} // Pass the full meal object
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageMeal;
