import React, { useState, useEffect } from 'react';
import DietSidebar from './DietSideBar/DietSideBar';
import MealCard from './MealCard/MealCard';
import RecipeCard from './RecipeCard/RecipeCard';
import NutrientChart from './NutrientChart';
import DailyCaloriesChart from './DailyCaloriesChart';
import { getDietByUserId } from '../../repositories/DietRepo'; // Use DietRepo
import NoPlanFound from '../NoPlanFound/NoPlanFound';
import './DietPage.css';

const DietPage = () => {
  const [userId, setUserId] = useState(null);
  const [diet, setDiet] = useState(null);
  const [activeMealId, setActiveMealId] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mealCache = {};

  // Fetch user ID from session/localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { userId } = JSON.parse(storedUser);
      setUserId(userId);
    } else {
      setError('User data not found in session');
      setLoading(false);
    }
  }, []);

  // Fetch Diet object for the user
  useEffect(() => {
    const fetchDiet = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const fetchedDiet = await getDietByUserId(userId); // Fetch diet from repository
        if (fetchedDiet && fetchedDiet.meals && fetchedDiet.meals.length > 0) {
          setDiet(fetchedDiet);
          setActiveMealId(fetchedDiet.meals[0].id); // Set first meal as default
        } else {
          setError('No meals found for the user\'s diet.');
        }
      } catch (err) {
        console.error('Error fetching diet:', err);
        setError('Failed to load diet. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiet();
  }, [userId]);

  // Fetch detailed meal data based on active meal ID
  useEffect(() => {
    const fetchMealData = async () => {
      if (!activeMealId || !diet) return;

      const selectedMeal = diet.meals.find((meal) => meal.id === activeMealId);
      if (!selectedMeal) return;

      // Check cache first
      if (mealCache[selectedMeal.id]) {
        setMealData(mealCache[selectedMeal.id]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedMeal.name}`);
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          const mealInfo = data.meals[0];
          const fetchedMealData = {
            image: mealInfo.strMealThumb,
            name: mealInfo.strMeal,
            calories: selectedMeal.calories,
            protein: selectedMeal.protein,
            carbs: selectedMeal.carbs,
            cookingTime: selectedMeal.cookingTime,
            recipe: mealInfo.strInstructions,
          };

          mealCache[selectedMeal.id] = fetchedMealData;
          setMealData(fetchedMealData);
        } else {
          setError('Meal details not found.');
        }
      } catch (error) {
        console.error('Error fetching meal details:', error);
        setError('Failed to load meal details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMealData();
  }, [activeMealId, diet]);

  // Handle meal selection change
  const handleMealChange = (mealId) => {
    setActiveMealId(mealId);
    setMealData(null);
    setError(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div><NoPlanFound type="meal" /></div>;
  }

  if (!mealData) {
    return <div>No data available</div>;
  }

  return (
    <div className="diet-page">
      <DietSidebar
        meals={diet.meals}
        activeMeal={activeMealId}
        onMealChange={handleMealChange}
      />

      <MealCard
        image={mealData.image}
        name={mealData.name}
        cookingTime={mealData.cookingTime}
        calories={mealData.calories}
        protein={mealData.protein}
        carbs={mealData.carbs}
      />

      <div className="charts-section">
        <div className="chart-container">
          <h3 className="chart-title">Nutrient Breakdown</h3>
          <NutrientChart
            data={[
              { name: 'Calories', value: mealData.calories },
              { name: 'Protein', value: mealData.protein },
              { name: 'Carbs', value: mealData.carbs },
            ]}
          />
        </div>
        <div className="chart-container">
          <h3 className="chart-title">Calories of the Day</h3>
          <DailyCaloriesChart dailyCalories={2000} mealCalories={mealData.calories} />
        </div>
      </div>

      <RecipeCard className="recipe-card" mealName={mealData.name} recipe={mealData.recipe} />
    </div>
  );
};

export default DietPage;
