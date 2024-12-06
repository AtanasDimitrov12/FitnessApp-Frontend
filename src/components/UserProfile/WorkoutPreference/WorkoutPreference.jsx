import React, { useState, useEffect } from 'react';
import ExistingWorkoutPreference from './ExistingWorkoutPreference';
import CreateWorkoutPreference from './CreateWorkoutPreference';
import { getUserWorkoutPreferenceByUserId } from '../../../repositories/WorkoutPreferenceRepo';
import './WorkoutPreference.css';

const WorkoutPreference = ({ userId }) => {
  const [workoutPreference, setWorkoutPreference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchUserPreference = async () => {
      setLoading(true);
      try {
        const preference = await getUserWorkoutPreferenceByUserId(userId);
        if (preference) {
          setWorkoutPreference(preference);
        } else {
          setWorkoutPreference(null);
          setError(false); // No existing preference is not an error.
        }
      } catch (err) {
        console.error('Error fetching workout preferences:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPreference();
  }, [userId]);

  if (loading) {
    return <p>Loading your workout preferences...</p>;
  }

  return (
    <div className="workout-preference">
      {workoutPreference && !error ? (
        <ExistingWorkoutPreference
          workoutPreference={workoutPreference}
          onCreateNew={() => setWorkoutPreference(null)} // Reset state to create new
        />
      ) : (
        <CreateWorkoutPreference
          update={!!workoutPreference} // Pass `true` if updating an existing preference
          passedUserId={userId}
          onSubmit={(newPreference) => {
            setWorkoutPreference(newPreference);
            setError(false); // Clear any existing error.
          }}
        />
      )}
      {error && <p className="error">Failed to fetch workout preferences.</p>}
    </div>
  );
};

export default WorkoutPreference;
