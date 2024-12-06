import backEndClient from './axiosClient';

const userWorkoutPreferenceURL = "/api/user-workout-preferences";

// Fetch UserWorkoutPreference by User ID
export const getUserWorkoutPreferenceByUserId = async (userId) => {
  try {
    const response = await backEndClient.get(`${userWorkoutPreferenceURL}/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching UserWorkoutPreference by User ID:", error);
    return null;
  }
};

// Create a new UserWorkoutPreference
export const createUserWorkoutPreference = async (userWorkoutPreferenceDTO) => {
  try {
    const response = await backEndClient.post(userWorkoutPreferenceURL, userWorkoutPreferenceDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error creating UserWorkoutPreference:", error);
    return null;
  }
};

// Update an existing UserWorkoutPreference
export const updateUserWorkoutPreference = async (userWorkoutPreferenceDTO) => {
  try {
    const response = await backEndClient.put(userWorkoutPreferenceURL, userWorkoutPreferenceDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error updating UserWorkoutPreference:", error);
    return null;
  }
};

// Delete a UserWorkoutPreference by User ID
export const deleteUserWorkoutPreference = async (userId) => {
  try {
    const response = await backEndClient.delete(`${userWorkoutPreferenceURL}/${userId}`);
    if (response.status === 204) {
      console.log("UserWorkoutPreference deleted successfully");
      return true;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Error deleting UserWorkoutPreference:", error);
    return false;
  }
};
