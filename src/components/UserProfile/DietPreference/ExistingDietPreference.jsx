import React from 'react';
import './DietPreference.css';

const ExistingDietPreference = ({ onCreateNew }) => {
  const userPreference = {
    goal: 'Muscle gain',
    calorieIntake: '3500 kcal',
    mealsPerDay: 4,
  };

  return (
    <div className="existing-diet-preference card">
      <h3>Your Existing Preference</h3>
      {userPreference ? (
        <div className='diet-preference-points'>
          <p><strong>Goal:</strong> {userPreference.goal}</p>
          <p><strong>Calorie intake:</strong> {userPreference.calorieIntake}</p>
          <p><strong>Meals per day:</strong> {userPreference.mealsPerDay}</p>
          <button className="create-button" onClick={onCreateNew}>Create new</button>
        </div>
      ) : (
        <p>You do not have a diet preference set. Please create one first.</p>
      )}
    </div>
  );
};

export default ExistingDietPreference;
