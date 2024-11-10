import backEndClient from './axiosClient';

const mealsURL = "/api/meals";

// Fetch all meals
export const getMeals = async () => {
    try {
        const response = await backEndClient.get(mealsURL);
        if (response.status === 200) {
            return response.data; 
        } else {
            console.error(`Error: Received status code ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching meals:", error);
        return null; 
    }
};

// Fetch a meal by ID
export const getMealById = async (id) => {
    try {
        const response = await backEndClient.get(`${mealsURL}/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error(`Error: Received status code ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching meal by ID:", error);
        return null;
    }
};

// Create a new meal
export const createNewMeal = async (mealData) => {
    try {
        const response = await backEndClient.post(mealsURL, mealData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating meal:", error);
        return null;
    }
};

// Update an existing meal
export const updateMeal = async (mealData) => {
    try {
        const response = await backEndClient.put(mealsURL, mealData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating meal:", error);
        return null;
    }
};

// Delete a meal by ID
export const deleteMeal = async (id) => {
    try {
        const response = await backEndClient.delete(`${mealsURL}/${id}`);
        if (response.status === 204) {
            console.log("Meal deleted successfully");
            return true;
        } else {
            console.error(`Error: Received status code ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("Error deleting meal:", error);
        return false;
    }
};
