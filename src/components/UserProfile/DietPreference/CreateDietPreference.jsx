import React, { useState } from 'react';
import './DietPreference.css';

const CreateDietPreference = ({ onSubmit }) => {
  const [goal, setGoal] = useState('');
  const [calories, setCalories] = useState('');
  const [mealsPerDay, setMealsPerDay] = useState('');
  const [calculatedCalories, setCalculatedCalories] = useState(null);

  // New state variables for user inputs
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const calculateCalories = () => {
    if (!age || !gender || !weight || !height || !activityLevel) {
      alert("Please fill out all fields for the calorie calculator.");
      return;
    }

    // Calculate BMR (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Adjust BMR based on activity level
    const recommendedCalories = Math.round(bmr * activityLevel);
    setCalculatedCalories(recommendedCalories);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="create-diet-preference" onSubmit={handleSubmit}>
      <h3>Create Diet Preference</h3>
      
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

      <div className="form-group">
        <label>2. Enter details for calorie calculation</label>
        <div className="input-with-label">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="small-input"
          />
        </div>
        <div className="input-with-label">
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="small-input"
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
            required
            className="small-input"
          />
        </div>
        <div className="input-with-label">
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            className="small-input"
          />
        </div>
        <div className="input-with-label">
          <label>Activity Level:</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            required
            className="small-input"
          >
            <option value="">Select</option>
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Lightly active (light exercise/sports 1-3 days a week)</option>
            <option value="1.55">Moderately active (moderate exercise/sports 3-5 days a week)</option>
            <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
            <option value="1.9">Super active (very hard exercise, physical job, or training twice a day)</option>
          </select>
        </div>
        <button type="button" onClick={calculateCalories} className="calculate-button">Calculate</button>
        {calculatedCalories && <p className="calculated-result">Recommended daily calories: {calculatedCalories} kcal</p>}
      </div>

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

      <div className="form-group">
        <label>4. How many times do you want to eat per day?</label>
        <div className="input-with-label">
        <input
          type="number"
          value={mealsPerDay}
          onChange={(e) => setMealsPerDay(e.target.value)}
          className="small-input"
          required
        />
        </div>
      </div>

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default CreateDietPreference;
