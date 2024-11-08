import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar/SideBar';
import MealCard from './MealCard/MealCard';
import RecipeCard from './RecipeCard/RecipeCard';
import NutrientChart from './NutrientChart';
import DailyCaloriesChart from './DailyCaloriesChart';
import './DietPage.css';

const DietPage = () => {
  const [activeMealId, setActiveMealId] = useState(1);
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mealCache = {}; // Cache to store fetched meal data

  const meals = [
    { id: 1, name: 'Chicken with rice', calories: 250, protein: 20, carbs: 30, cookingTime: 25 },
    { id: 2, name: 'Baked salmon with fennel & tomatoes', calories: 350, protein: 30, carbs: 40, cookingTime: 45 },
    { id: 3, name: '15-minute chicken & halloumi burgers', calories: 300, protein: 25, carbs: 20, cookingTime: 30 },
    // Add more meals as needed
  ];

  const dailyCalories = 2000;

  const handleMealChange = (mealId) => {
    setActiveMealId(mealId);
    setMealData(null); // Reset meal data while loading new meal
    setError(null); // Clear any previous errors
  };

  useEffect(() => {
    const fetchMealData = async () => {
      const selectedMeal = meals.find(meal => meal.id === activeMealId);
      if (!selectedMeal) return;

      // Check if meal data is already cached
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

          // Cache the meal data
          mealCache[selectedMeal.id] = fetchedMealData;
          setMealData(fetchedMealData);
        } else {
          setError("Meal data not found.");
        }
      } catch (error) {
        setError("Error fetching meal data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMealData();
  }, [activeMealId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!mealData) {
    return <div>No data available</div>;
  }

  return (
    <div className="diet-page">
      <Sidebar meals={meals} activeMeal={activeMealId} onMealChange={handleMealChange} />
      
      
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
          <NutrientChart data={[
            { name: 'Calories', value: mealData.calories },
            { name: 'Protein', value: mealData.protein },
            { name: 'Carbs', value: mealData.carbs },
          ]} />
        </div>
        <div className="chart-container">
          <h3 className="chart-title">Calories of the Day</h3>
          <DailyCaloriesChart dailyCalories={dailyCalories} mealCalories={mealData.calories} />
        </div>
      </div>

      <RecipeCard className="recipe-card" mealName={mealData.name} recipe={mealData.recipe} />
    </div>
  );
};

export default DietPage;
