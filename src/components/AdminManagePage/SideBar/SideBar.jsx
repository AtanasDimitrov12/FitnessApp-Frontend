import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  return (
    <div className="sidebarAdmin">
      <button
        className={`sidebar-button ${activeSection === 'manageExercise' ? 'active' : ''}`}
        onClick={() => onSectionChange('manageExercise')}
      >
        Manage Exercises
      </button>
      <button
        className={`sidebar-button ${activeSection === 'manageWorkout' ? 'active' : ''}`}
        onClick={() => onSectionChange('manageWorkout')}
      >
        Manage Workouts
      </button>
      <button
        className={`sidebar-button ${activeSection === 'manageMeals' ? 'active' : ''}`}
        onClick={() => onSectionChange('manageMeals')}
      >
        Manage Meals
      </button>
    </div>
  );
};

export default Sidebar;