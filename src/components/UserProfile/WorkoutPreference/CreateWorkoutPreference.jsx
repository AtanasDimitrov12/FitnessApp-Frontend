import React, { useState } from 'react';
import './WorkoutPreference.css';
import { createUserWorkoutPreference, updateUserWorkoutPreference } from '../../../repositories/WorkoutPreferenceRepo';

const CreateWorkoutPreference = ({ update, passedUserId, onSubmit }) => {
  const [goal, setGoal] = useState('Maintenance');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [trainingStyle, setTrainingStyle] = useState('');
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!goal || !fitnessLevel || !trainingStyle || !workoutsPerWeek) {
      alert('Please fill out all fields to set your workout preference.');
      return;
    }

    const userWorkoutPreferenceDTO = {
      userid: passedUserId,
      fitnessGoal: goal,
      fitnessLevel,
      preferredTrainingStyle: trainingStyle,
      daysAvailable: parseInt(workoutsPerWeek, 10),
    };

    try {
      const response = update
        ? await updateUserWorkoutPreference(userWorkoutPreferenceDTO)
        : await createUserWorkoutPreference(userWorkoutPreferenceDTO);

      if (response) {
        alert(`Workout preference successfully ${update ? 'updated' : 'created'}!`);
        if (onSubmit) onSubmit(response);
      } else {
        alert(`Failed to ${update ? 'update' : 'create'} workout preference. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${update ? 'updating' : 'creating'} workout preference:`, error);
      alert('An error occurred while saving your workout preference.');
    }
  };

  return (
    <form className="set-workout-preference" onSubmit={handleSubmit}>
      <h3>{update ? 'Update Workout Preference' : 'Set Your Workout Preference'}</h3>

      {/* Goal Selection */}
      <div className="form-group">
        <label>1. What is your goal?</label>
        <div className="radio-options">
          <label>
            <input
              type="radio"
              value="Weight Loss"
              checked={goal === 'Weight Loss'}
              onChange={(e) => setGoal(e.target.value)}
            />
            Weight Loss
          </label>
          <label>
            <input
              type="radio"
              value="Muscle Gain"
              checked={goal === 'Muscle Gain'}
              onChange={(e) => setGoal(e.target.value)}
            />
            Muscle Gain
          </label>
          <label>
            <input
              type="radio"
              value="Maintenance"
              checked={goal === 'Maintenance'}
              onChange={(e) => setGoal(e.target.value)}
            />
            Maintenance
          </label>
        </div>
      </div>

      {/* Fitness Level */}
      <div className="form-group">
        <label>2. What is your current fitness level?</label>
        <div className="radio-options">
          <label>
            <input
              type="radio"
              value="Beginner"
              checked={fitnessLevel === 'Beginner'}
              onChange={(e) => setFitnessLevel(e.target.value)}
            />
            Beginner
          </label>
          <label>
            <input
              type="radio"
              value="Intermediate"
              checked={fitnessLevel === 'Intermediate'}
              onChange={(e) => setFitnessLevel(e.target.value)}
            />
            Intermediate
          </label>
          <label>
            <input
              type="radio"
              value="Advanced"
              checked={fitnessLevel === 'Advanced'}
              onChange={(e) => setFitnessLevel(e.target.value)}
            />
            Advanced
          </label>
        </div>
      </div>

      {/* Training Style */}
      <div className="form-group">
        <label>3. What is your preferred training style?</label>
        <div className="radio-options">
          <label>
            <input
              type="radio"
              value="Strength"
              checked={trainingStyle === 'Strength'}
              onChange={(e) => setTrainingStyle(e.target.value)}
            />
            Strength
          </label>
          <label>
            <input
              type="radio"
              value="Endurance"
              checked={trainingStyle === 'Endurance'}
              onChange={(e) => setTrainingStyle(e.target.value)}
            />
            Endurance
          </label>
        </div>
      </div>

      {/* Workouts Per Week */}
      <div className="form-group">
        <label>4. How many times do you want to train per week?</label>
        <div className="input-with-label">
          <input
            type="number"
            min="1"
            max="7"
            value={workoutsPerWeek}
            onChange={(e) => setWorkoutsPerWeek(e.target.value)}
            className="small-input"
            required
          />
          <span>sessions</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="submit-button-container">
        <button
          type="submit"
          className="medium-submit-button"
          disabled={!goal || !fitnessLevel || !trainingStyle || !workoutsPerWeek}
        >
          {update ? 'Update Preference' : 'Create Preference'}
        </button>
      </div>
    </form>
  );
};

export default CreateWorkoutPreference;
