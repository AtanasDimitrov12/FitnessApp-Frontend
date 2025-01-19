import React, { useState, useEffect } from 'react';
import ExistingWorkoutPreference from './ExistingWorkoutPreference';
import CreateWorkoutPreference from './CreateWorkoutPreference';
import { getUserWorkoutPreferenceByUserId } from '../../../repositories/WorkoutPreferenceRepo';
import './WorkoutPreference.css';
import NoPreference from '../../NoPreference/NoPreference';

const WorkoutPreference = ({ userId }) => {
  const [workoutPreference, setWorkoutPreference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false); // NEW: Track create form

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
          setShowCreateForm(false); // Ensure we show the existing preference
        } else {
          setWorkoutPreference(null);
          setError(false); // No preference is not an error.
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
      {showCreateForm ? (
        <CreateWorkoutPreference
          update={workoutPreference !== null} // Update if a preference exists
          passedUserId={userId}
          onSubmit={(newPreference) => {
            setWorkoutPreference(newPreference);
            setShowCreateForm(false); // Switch back after update/create
            setError(false);
          }}
        />
      ) : (
        workoutPreference && !error ? (
          <ExistingWorkoutPreference
            workoutPreference={workoutPreference}
            onCreateNew={() => setShowCreateForm(true)} // NEW: Switch to create mode
          />
        ) : (
          <NoPreference
            title="No Workout Preference Found"
            description="It looks like you haven't set up your workout preferences yet."
            buttonText="Create Workout Preference"
            onCreate={() => setShowCreateForm(true)}
          />
        )
      )}
      {error && <p className="error">Failed to fetch workout preferences.</p>}
    </div>
  );
};

export default WorkoutPreference;
