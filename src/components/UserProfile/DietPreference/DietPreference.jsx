import React, { useState, useEffect } from 'react';
import ExistingDietPreference from './ExistingDietPreference';
import CreateDietPreference from './CreateDietPreference';
import { getUserDietPreferenceByUserId } from '../../../repositories/DietPreferenceRepo';
import './DietPreference.css';

const DietPreference = ({ userId }) => {
  const [dietPreference, setDietPreference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // Track whether to show the CreateDietPreference form

  useEffect(() => {
    if (!userId) {
      setError('User ID is required to fetch diet preferences.');
      setLoading(false);
      return;
    }

    const fetchUserPreference = async () => {
      setLoading(true);
      try {
        const preference = await getUserDietPreferenceByUserId(userId);
        setDietPreference(preference || null);
        setShowCreateForm(false); // Ensure we start by showing the existing preference
      } catch (err) {
        setError('Failed to fetch diet preferences.');
        console.error('Error fetching diet preferences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPreference();
  }, [userId]);

  if (loading) {
    return <p>Loading your diet preferences...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const handleCreateNew = () => {
    setShowCreateForm(true); // Show the CreateDietPreference form
  };

  const handleFormSubmit = (newPreference) => {
    setDietPreference(newPreference); // Update the diet preference state
    setShowCreateForm(false); // Return to showing the existing preference after creation or update
  };

  return (
    <div className="diet-preference">
      {showCreateForm ? (
        <CreateDietPreference
          update={!!dietPreference} // Determine if we're updating or creating
          passedUserId={userId}
          onSubmit={handleFormSubmit} // Handle form submission
        />
      ) : (
        <ExistingDietPreference
          dietPreference={dietPreference}
          onCreateNew={handleCreateNew} // Trigger showing the CreateDietPreference form
        />
      )}
    </div>
  );
};

export default DietPreference;
