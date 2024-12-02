import React, { useState, useEffect } from 'react';
import ExistingDietPreference from './ExistingDietPreference';
import CreateDietPreference from './CreateDietPreference';
import { getUserDietPreferenceByUserId } from '../../../repositories/DietPreferenceRepo'; // Adjust the import path as needed
import './DietPreference.css';

const DietPreference = ({ userId }) => {
  const [hasPreference, setHasPreference] = useState(null); // null indicates loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPreference = async () => {
      try {
        const preference = await getUserDietPreferenceByUserId(userId);
        setHasPreference(!!preference);
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
    <div className="diet-preference">
      {hasPreference ? (
        <ExistingDietPreference onCreateNew={() => setHasPreference(false)} userId={userId} />
      ) : (
        <CreateDietPreference onSubmit={() => setHasPreference(true)} userId={userId} />
      )}
    </div>
  );
};

export default DietPreference;
