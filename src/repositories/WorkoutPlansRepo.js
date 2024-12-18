import backEndClient from "./axiosClient";

const workoutPlansURL = "/api/workout-plans";

// Fetch all workout plans
export const getAllWorkoutPlans = async () => {
  try {
    const response = await backEndClient.get(workoutPlansURL);
    return response.data; // Return the list of workout plans
  } catch (error) {
    handleRequestError("Error fetching all workout plans", error);
    return null;
  }
};

// Fetch a workout plan by ID
export const getWorkoutPlanById = async (id) => {
  try {
    const response = await backEndClient.get(`${workoutPlansURL}/${id}`);
    return response.data;
  } catch (error) {
    handleRequestError("Error fetching workout plan by ID", error);
    return null;
  }
};

// Fetch a workout plan by User ID
export const getWorkoutPlanByUserId = async (userId) => {
  try {
    const response = await backEndClient.get(`${workoutPlansURL}/user/${userId}`);
    return response.data;
  } catch (error) {
    handleRequestError("Error fetching workout plan for user ID", error);
    return null;
  }
};

// Create a new workout plan (Admin only)
export const createWorkoutPlan = async (workoutPlanDTO) => {
  try {
    const response = await backEndClient.post(workoutPlansURL, workoutPlanDTO);
    return response.data; // Return the created workout plan
  } catch (error) {
    handleRequestError("Error creating workout plan", error);
    throw error; // Re-throw error for handling by the caller
  }
};

// Update a workout plan (Admin only)
export const updateWorkoutPlan = async (id, workoutPlanDTO) => {
  try {
    const response = await backEndClient.put(
      `${workoutPlansURL}/${id}`,
      workoutPlanDTO
    );
    return response.data; // Return the updated workout plan
  } catch (error) {
    handleRequestError("Error updating workout plan", error);
    throw error;
  }
};

// Delete a workout plan (Admin only)
export const deleteWorkoutPlan = async (id) => {
  try {
    const response = await backEndClient.delete(`${workoutPlansURL}/${id}`);
    if (response.status === 204) {
      console.log("Workout plan deleted successfully");
      return true; // Deletion successful
    }
    console.error(`Unexpected response status: ${response.status}`);
    return false;
  } catch (error) {
    handleRequestError("Error deleting workout plan", error);
    return false;
  }
};

// Utility function for handling and logging request errors
const handleRequestError = (message, error) => {
  console.error(`${message}:`, error.response || error.message);
};
