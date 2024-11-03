import React, { useState } from 'react';
import './WorkoutPreference.css';

const CreateWorkoutPreference = ({ onSubmit }) => {
  const [goal, setGoal] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [trainingStyle, setTrainingStyle] = useState('');
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ goal, fitnessLevel, trainingStyle, workoutsPerWeek });
  };

  return (
    <form className="set-workout-preference" onSubmit={handleSubmit}>
      <h3>Set Your Workout Preference</h3>
      
      <div className="form-group">
        <label>1. What is your goal?</label>
        <div className="radio-options">
          <label><input type="radio" value="Weight Loss" checked={goal === 'Weight Loss'} onChange={(e) => setGoal(e.target.value)} /> Weight Loss</label>
          <label><input type="radio" value="Muscle Gain" checked={goal === 'Muscle Gain'} onChange={(e) => setGoal(e.target.value)} /> Muscle Gain</label>
          <label><input type="radio" value="Maintenance" checked={goal === 'Maintenance'} onChange={(e) => setGoal(e.target.value)} /> Maintenance</label>
        </div>
      </div>

      <div className="form-group">
        <label>2. What is your current fitness level?</label>
        <div className="radio-options">
          <label><input type="radio" value="Beginner" checked={fitnessLevel === 'Beginner'} onChange={(e) => setFitnessLevel(e.target.value)} /> Beginner</label>
          <label><input type="radio" value="Intermediate" checked={fitnessLevel === 'Intermediate'} onChange={(e) => setFitnessLevel(e.target.value)} /> Intermediate</label>
          <label><input type="radio" value="Advanced" checked={fitnessLevel === 'Advanced'} onChange={(e) => setFitnessLevel(e.target.value)} /> Advanced</label>
        </div>
      </div>

      <div className="form-group">
        <label>3. What is your preferred training style?</label>
        <div className="radio-options">
          <label><input type="radio" value="Strength" checked={trainingStyle === 'Strength'} onChange={(e) => setTrainingStyle(e.target.value)} /> Strength</label>
          <label><input type="radio" value="Endurance" checked={trainingStyle === 'Endurance'} onChange={(e) => setTrainingStyle(e.target.value)} /> Endurance</label>
        </div>
      </div>

      <div className="form-group">
        <label>4. How many times do you want to train per week?</label>
        <input type="number" min="1" max="7" value={workoutsPerWeek} onChange={(e) => setWorkoutsPerWeek(e.target.value)} className="small-input" required />
      </div>

      <div className="submit-button-container">
        <button type="submit" className="medium-submit-button">Submit</button>
      </div>
    </form>
  );
};

export default CreateWorkoutPreference;
