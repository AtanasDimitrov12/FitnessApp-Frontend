import React from 'react';
import './Sidebar.css';

const Sidebar = ({ workouts, activeWorkout, onWorkoutChange }) => {
  return (
    <div className="sidebarWorkout">
      {workouts.map((workout, index) => (
        <button
          key={index}
          className={`sidebar-button ${activeWorkout === workout.id ? 'active' : ''}`}
          onClick={() => onWorkoutChange(workout.id)}
        >
          {workout.name}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
