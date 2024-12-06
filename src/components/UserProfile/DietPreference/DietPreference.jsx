import React, { useState, useEffect } from 'react';
import ExistingDietPreference from './ExistingDietPreference';
import CreateDietPreference from './CreateDietPreference';
import { getUserDietPreferenceByUserId } from '../../../repositories/DietPreferenceRepo';
import './DietPreference.css';

const DietPreference = ({ userId }) => {
  const [dietPreference, setDietPreference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const isUpdate = dietPreference !== null; // Determine if it's an update

  return (
    <div className="diet-preference">
      {isUpdate ? (
        <ExistingDietPreference
          dietPreference={dietPreference}
          onCreateNew={() => setDietPreference(null)} // Reset state to create new
        />
      ) : (
        <CreateDietPreference
          update={isUpdate} // Pass whether it's an update or not
          passedUserId={userId} // Pass userId
          onSubmit={(newPreference) => setDietPreference(newPreference)} // Update state with new preference
        />
      )}
    </div>
  );
};

export default DietPreference;
