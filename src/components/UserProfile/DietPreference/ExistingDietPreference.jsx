import React, { useState, useEffect } from 'react';
import './DietPreference.css';
import { getUserDietPreferenceByUserId } from '../../../repositories/DietPreferenceRepo'; // Adjust the import path as needed

const ExistingDietPreference = ({ userId, onCreateNew }) => {
  const [userPreference, setUserPreference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPreference = async () => {
      try {
        const preference = await getUserDietPreferenceByUserId(userId);
        if (preference) {
          setUserPreference(preference);
        } else {
          setUserPreference(null);
        }
      } catch (err) {
        setError('Failed to fetch diet preferences.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserPreference();
    } else {
      setError('User ID is required to fetch diet preferences.');
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <p>Loading your diet preferences...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="existing-diet-preference card">
      <h3>Your Existing Preference</h3>
      {userPreference ? (
        <div className="diet-preference-points">
          <p><strong>Goal:</strong> {userPreference.goal}</p>
          <p><strong>Calorie intake:</strong> {userPreference.calorieIntake} kcal</p>
          <p><strong>Meals per day:</strong> {userPreference.mealsPerDay}</p>
          <button className="create-button" onClick={onCreateNew}>Create new</button>
        </div>
      ) : (
        <div>
          <p>You do not have a diet preference set. Please create one first.</p>
          <button className="create-button" onClick={onCreateNew}>Create new</button>
        </div>
      )}
    </div>
  );
};

export default ExistingDietPreference;
