import React from 'react';
import './DietPreference.css';

const ExistingDietPreference = ({ dietPreference, onCreateNew }) => {
  // Handle the case where dietPreference is null just in case
  if (!dietPreference) {
    return (
      <div className="existing-diet-preference card">
        <h3>Your Existing Preference</h3>
        <p>You do not have a diet preference set. Please create one first.</p>
        <button className="create-button" onClick={onCreateNew}>Create new</button>
      </div>
    );
  }

  return (
    <div className="existing-diet-preference card">
      <h3>Your Existing Diet Preference</h3>
      <div className="diet-preference-points">
        <p><strong>Calorie intake:</strong> {dietPreference.calories} kcal</p>
        <p><strong>Meals per day:</strong> {dietPreference.mealFrequency}</p>
        <button className="create-button" onClick={onCreateNew}>Create new</button>
      </div>
    </div>
  );
};

export default ExistingDietPreference;
