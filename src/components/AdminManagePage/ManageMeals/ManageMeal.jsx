import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate'; // Import React Paginate
import { useNavigate } from 'react-router-dom';
import MealCard from './MealCard/MealCard';
import { getMeals, deleteMeal } from '../../../repositories/MealRepo';
import './ManageMeal.css'; // Custom CSS

const ManageMeal = () => {
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const mealsPerPage = 12; // Set to 12 meals per page
  const navigate = useNavigate();

  // Fetch all meals on component mount
  useEffect(() => {
    const fetchMeals = async () => {
      const fetchedMeals = await getMeals();
      if (fetchedMeals) {
        setMeals(fetchedMeals.reverse());
      } else {
        console.error('Failed to fetch meals.');
      }
    };

    fetchMeals();
  }, []);

  // Calculate pagination logic
  const offset = currentPage * mealsPerPage;
  const currentMeals = meals.slice(offset, offset + mealsPerPage);
  const pageCount = Math.ceil(meals.length / mealsPerPage);

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
    navigate('/update-meal', { state: { meal } });
  };

  // Handle page click
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="manage-meal-page">
      <div className="manage-meal-content">
        <h2 className="page-title">Manage Meals</h2>
        <div className="manage-meal-list">
          {currentMeals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={{ ...meal, cookingTime: parseFloat(meal.cookingTime).toFixed(1) }} // Round here
              onDelete={() => handleDelete(meal.id)}
              onEdit={() => handleEdit(meal)}
            />
          ))}
        </div>
        <ReactPaginate
          previousLabel="← Previous"
          nextLabel="Next →"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination-container"
          pageClassName="pagination-page"
          activeClassName="pagination-active"
          previousClassName="pagination-previous"
          nextClassName="pagination-next"
          disabledClassName="pagination-disabled"
        />
      </div>
    </div>
  );
};

export default ManageMeal;
