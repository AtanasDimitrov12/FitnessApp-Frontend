import backEndClient from './axiosClient';

const dietsURL = "/api/diets";

// Fetch all exercises
export const getAllDiets = async () => {
  try {
    const response = await backEndClient.get(dietsURL);
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
export const getDietByUserId = async (userId) => {
  try {
    const response = await backEndClient.get(`${dietsURL}/user/${userId}`);
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