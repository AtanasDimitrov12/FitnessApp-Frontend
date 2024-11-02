import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  return (
    <div className="sidebar">
      <button
        className={`sidebar-button ${activeSection === 'profileInfo' ? 'active' : ''}`}
        onClick={() => onSectionChange('profileInfo')}
      >
        Profile information
      </button>
      <button
        className={`sidebar-button ${activeSection === 'dietPreference' ? 'active' : ''}`}
        onClick={() => onSectionChange('dietPreference')}
      >
        Diet Preference
      </button>
      <button
        className={`sidebar-button ${activeSection === 'workoutPreference' ? 'active' : ''}`}
        onClick={() => onSectionChange('workoutPreference')}
      >
        Workout Preference
      </button>
      <button
        className={`sidebar-button ${activeSection === 'progressNotes' ? 'active' : ''}`}
        onClick={() => onSectionChange('progressNotes')}
      >
        Progress notes
      </button>
    </div>
  );
};

export default Sidebar;
