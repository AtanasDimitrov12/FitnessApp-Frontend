import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  return (
    
    <div className="sidebarAdmin">
      <button
        className={`sidebar-button ${activeSection === 'createExercise' ? 'active' : ''}`}
        onClick={() => onSectionChange('createExercise')}
      >
        Create Exercise
      </button>
      <button
        className={`sidebar-button ${activeSection === 'createWorkout' ? 'active' : ''}`}
        onClick={() => onSectionChange('createWorkout')}
      >
        Create Workout
      </button>
      <button
        className={`sidebar-button ${activeSection === 'createMeal' ? 'active' : ''}`}
        onClick={() => onSectionChange('createMeal')}
      >
        Create Meal
      </button>
    </div>
  );
};

export default Sidebar;
