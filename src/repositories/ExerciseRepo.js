import backEndClient from './axiosClient';

const exercisesURL = "/api/exercises";

// Fetch all exercises
export const getAllExercises = async () => {
  try {
    const response = await backEndClient.get(exercisesURL);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return null;
  }
};

// Fetch exercise by ID
export const getExerciseById = async (id) => {
  try {
    const response = await backEndClient.get(`${exercisesURL}/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching exercise by ID:", error);
    return null;
  }
};

// Create a new exercise
export const createExercise = async (exerciseData) => {
  try {
    const response = await backEndClient.post(exercisesURL, exerciseData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating exercise:", error);
    return null;
  }
};

// Update an existing exercise
export const updateExercise = async (exerciseData) => {
  try {
    const response = await backEndClient.put(exercisesURL, exerciseData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error updating exercise:", error);
    return null;
  }
};

// Delete an exercise by ID
export const deleteExercise = async (id) => {
  try {
    const response = await backEndClient.delete(`${exercisesURL}/${id}`);
    if (response.status === 204) {
      console.log("Exercise deleted successfully");
      return true;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Error deleting exercise:", error);
    return false;
  }
};
