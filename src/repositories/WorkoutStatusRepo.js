import backEndClient from './axiosClient'; // Axios client configuration

const workoutStatusURL = "/api/workout-status";

/**
 * Marks a workout as done for a specific user.
 *
 * @param {number} workoutPlanId - ID of the workout plan
 * @param {number} workoutId - ID of the workout
 * @param {number} userId - ID of the user
 * @returns {Promise<string>} - Success message or throws an error
 */
export const markWorkoutAsDone = async (workoutPlanId, workoutId, userId) => {
  try {
    const response = await backEndClient.post(`${workoutStatusURL}/mark-done`, null, {
      params: { workoutPlanId, workoutId, userId },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data; // Return success message
    }

    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error marking workout as done:", error.message);
    throw error; // Propagate the error for handling in the calling function
  }
};
