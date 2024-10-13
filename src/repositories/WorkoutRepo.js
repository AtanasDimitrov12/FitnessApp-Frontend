import backEndClient from './axiosClient';

const workoutsURL = "api/workouts"; 

export const getWorkout = async () => {
    try {
        const response = await backEndClient.get(workoutsURL);
        if (response.status === 200) {
            return response.data; 
        } else {
            console.error(`Error: Received status code ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching workouts:", error);
        return null; 
    }
};


export const createNewWorkout = async (formData) => {
  try {
    const response = await backEndClient.post(workoutsURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating workout:", error);
    return null;
  }
};


export const deleteWorkout = async (id) => {
  try {
    const response = await backEndClient.delete(`${workoutsURL}/${id}`);
    if (response.status === 204) {
      console.log("Workout deleted successfully");
      return true;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Error deleting workout:", error);
    return false;
  }
};
