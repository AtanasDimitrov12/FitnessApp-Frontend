import React, { useState, useEffect } from 'react';
import ExistingDietPreference from './ExistingDietPreference';
import CreateDietPreference from './CreateDietPreference';
import { getUserDietPreferenceByUserId } from '../../../repositories/DietPreferenceRepo';
import './DietPreference.css';
import NoPreference from '../../NoPreference/NoPreference';

const DietPreference = ({ userId }) => {
  const [dietPreference, setDietPreference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

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
        setShowCreateForm(false); // Ensure correct view is shown
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
    setShowCreateForm(true);
  };

  const handleFormSubmit = (newPreference) => {
    setDietPreference(newPreference);
    setShowCreateForm(false);
  };

  return (
    <div className="diet-preference">
      {showCreateForm ? (
        <CreateDietPreference
          update={showCreateForm && dietPreference !== null} // Fix: Correctly determine update mode
          passedUserId={userId}
          onSubmit={handleFormSubmit}
        />
      ) : (
        dietPreference ? (
          <ExistingDietPreference
            dietPreference={dietPreference}
            onCreateNew={handleCreateNew} // Show form when "Create New" is clicked
          />
        ) : (
          <NoPreference
            title="No Diet Preference Found"
            description="It looks like you haven't set up your diet preferences yet."
            buttonText="Create Diet Preference"
            onCreate={() => setShowCreateForm(true)}
          />
        )
      )}
    </div>
  );
};

export default DietPreference;
