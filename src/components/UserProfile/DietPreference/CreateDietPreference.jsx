import React, { useState } from 'react';
import './DietPreference.css';
import { createUserDietPreference, updateUserDietPreference } from '../../../repositories/DietPreferenceRepo';

const CreateDietPreference = ({ update, passedUserId, onSubmit }) => {
  const [goal, setGoal] = useState('Maintenance');
  const [calories, setCalories] = useState('');
  const [mealsPerDay, setMealsPerDay] = useState('');
  const [calculatedCalories, setCalculatedCalories] = useState(null);

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const calculateCalories = () => {
    if (!age || !gender || !weight || !height || !activityLevel) {
      alert('Please fill out all fields for the calorie calculator.');
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let recommendedCalories = Math.round(bmr * activityLevel);

    if (goal === 'Weight Loss') {
      recommendedCalories = Math.round(recommendedCalories * 0.8); // 20% calorie deficit
    } else if (goal === 'Muscle Gain') {
      recommendedCalories = Math.round(recommendedCalories * 1.2); // 20% calorie surplus
    }

    setCalculatedCalories(recommendedCalories);
    setCalories(recommendedCalories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate calories and mealsPerDay
    if (!calories || !mealsPerDay || mealsPerDay < 2 || mealsPerDay > 6) {
      alert('Please provide valid values for calories and meals per day.');
      return;
    }

    const userDietPreferenceDTO = {
      userid: passedUserId,
      calories: parseInt(calories, 10),
      mealFrequency: parseInt(mealsPerDay, 10),
    };

    try {
      const response = update
        ? await updateUserDietPreference(userDietPreferenceDTO) // Call update method if updating
        : await createUserDietPreference(userDietPreferenceDTO); // Call create method if creating

      if (response) {
        alert(`Diet preference successfully ${update ? 'updated' : 'created'}!`);
        if (onSubmit) onSubmit(response);
      } else {
        alert(`Failed to ${update ? 'update' : 'create'} diet preference. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${update ? 'updating' : 'creating'} diet preference:`, error);
      alert(`An error occurred while ${update ? 'updating' : 'creating'} the diet preference.`);
    }
  };

  return (
    <form className="create-diet-preference" onSubmit={handleSubmit}>
      <h3>{update ? 'Update Diet Preference' : 'Create Diet Preference'}</h3>

      {/* Goal Selection */}
      <div className="form-group">
        <label>1. What is your goal?</label>
        <div className="radio-options">
          <label>
            <input
              type="radio"
              value="Maintenance"
              className="radio-button-option"
              checked={goal === 'Maintenance'}
              onChange={(e) => setGoal(e.target.value)}
            />
            Maintenance
          </label>
          <label>
            <input
              type="radio"
              value="Weight Loss"
              className="radio-button-option"
              checked={goal === 'Weight Loss'}
              onChange={(e) => setGoal(e.target.value)}
            />
            Weight Loss
          </label>
          <label>
            <input
              type="radio"
              value="Muscle Gain"
              className="radio-button-option"
              checked={goal === 'Muscle Gain'}
              onChange={(e) => setGoal(e.target.value)}
            />
            Muscle Gain
          </label>
        </div>
      </div>

      {/* Calorie Calculation Inputs */}
      <div className="form-group">
        <label>2. Enter details for calorie calculation</label>
        <div className="input-with-label">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="small-input"
            required
          />
        </div>
        <div className="input-with-label">
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="small-input"
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="input-with-label">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="small-input"
            required
          />
        </div>
        <div className="input-with-label">
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="small-input"
            required
          />
        </div>
        <div className="input-with-label">
          <label>Activity Level:</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="small-input"
            required
          >
            <option value="">Select</option>
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Lightly active (light exercise/sports 1-3 days a week)</option>
            <option value="1.55">Moderately active (moderate exercise/sports 3-5 days a week)</option>
            <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
            <option value="1.9">Super active (very hard exercise, physical job, or training twice a day)</option>
          </select>
        </div>
        <button type="button" onClick={calculateCalories} className="calculate-button">
          Calculate
        </button>
        {calculatedCalories && (
          <p className="calculated-result">Recommended daily calories: {calculatedCalories} kcal</p>
        )}
      </div>

      {/* Custom Calorie Input */}
      <div className="form-group">
        <label>3. How many calories approximately do you want to take per day?</label>
        <div className="input-with-label">
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="small-input"
            required
          />
          <span>kcal</span>
        </div>
      </div>

      {/* Meals Per Day Input */}
      <div className="form-group">
        <label>4. How many times do you want to eat per day?</label>
        <div className="input-with-label">
          <input
            type="number"
            value={mealsPerDay}
            onChange={(e) => setMealsPerDay(e.target.value)}
            className="small-input"
            required
            min="2"
            max="6"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="submit-button-container">
        <button
          type="submit"
          className="medium-submit-button"
          disabled={!goal || !calories || !mealsPerDay}
        >
          {update ? 'Update Preference' : 'Create Preference'}
        </button>
      </div>
    </form>
  );
};

export default CreateDietPreference;
