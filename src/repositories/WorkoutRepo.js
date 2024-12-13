import backEndClient from './axiosClient';

const workoutsURL = "/api/workouts";

// Fetch all workouts
export const getWorkouts = async () => {
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

// Create a new workout with workout data and image file
export const createNewWorkout = async (workoutData, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("workout", JSON.stringify(workoutData)); // Send workout as JSON string
    if (imageFile) {
      formData.append("image", imageFile); // Append image file if provided
    }

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

// Update an existing workout with optional image
export const updateWorkout = async (workoutData, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("workout", JSON.stringify(workoutData));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await backEndClient.put(workoutsURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating workout:", error);
    return null;
  }
};

// Delete a workout by ID
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
