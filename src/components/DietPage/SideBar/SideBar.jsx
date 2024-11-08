import React from 'react';
import './Sidebar.css';

const Sidebar = ({ meals, activeMeal, onMealChange }) => {
  return (
    <div className="sidebar">
      {meals.map((meal, index) => (
        <button
          key={index}
          className={`sidebar-button ${activeMeal === meal.id ? 'active' : ''}`}
          onClick={() => onMealChange(meal.id)}
        >
          Meal {index+1}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
