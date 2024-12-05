import React, { useState, useEffect } from 'react';
import ExistingWorkoutPreference from './ExistingWorkoutPreference';
import CreateWorkoutPreference from './CreateWorkoutPreference';
import { getUserWorkoutPreferenceByUserId } from '../../../repositories/WorkoutPreferenceRepo';
import './WorkoutPreference.css';

const WorkoutPreference = ({ userId }) => {
  const [workoutPreference, setWorkoutPreference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError('User ID is required to fetch workout preferences.');
      setLoading(false);
      return;
    }

    const fetchUserPreference = async () => {
      setLoading(true);
      try {
        const preference = await getUserWorkoutPreferenceByUserId(userId);
        setWorkoutPreference(preference || null);
      } catch (err) {
        setError('Failed to fetch workout preferences.');
        console.error('Error fetching workout preferences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPreference();
  }, [userId]);

  if (loading) {
    return <p>Loading your workout preferences...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="workout-preference">
      {workoutPreference ? (
        <ExistingWorkoutPreference
          workoutPreference={workoutPreference}
          onCreateNew={() => setWorkoutPreference(null)} // Reset state to create new
        />
      ) : (
        <CreateWorkoutPreference
          passedUserId={userId} // Ensure userId is passed correctly
          onSubmit={(newPreference) => setWorkoutPreference(newPreference)} // Update state with new preference
        />
      )}
    </div>
  );
};

export default WorkoutPreference;
