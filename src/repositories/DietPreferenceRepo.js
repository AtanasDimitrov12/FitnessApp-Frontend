import backEndClient from './axiosClient';

const userDietPreferenceURL = "/api/user-diet-preferences";

// Fetch UserDietPreference by User ID
export const getUserDietPreferenceByUserId = async (userId) => {
  try {
    const response = await backEndClient.get(`${userDietPreferenceURL}/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching UserDietPreference:", error);
    return null;
  }
};

// Create UserDietPreference
export const createUserDietPreference = async (userDietPreferenceDTO) => {
    try {
      const response = await backEndClient.post(userDietPreferenceURL, userDietPreferenceDTO);
      if (response.status === 201) {
        return response.data;
      } else {
        console.error(`Error: Received status code ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error creating UserDietPreference:", error);
      return null;
    }
  };

  // Update UserDietPreference
export const updateUserDietPreference = async (userDietPreferenceDTO) => {
    try {
      const response = await backEndClient.put(userDietPreferenceURL, userDietPreferenceDTO);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(`Error: Received status code ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error updating UserDietPreference:", error);
      return null;
    }
  };