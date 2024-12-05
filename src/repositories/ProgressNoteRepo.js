import backEndClient from './axiosClient';

const progressNotesURL = "/api/progress-notes";

// Fetch all progress notes
export const getAllProgressNotes = async () => {
  try {
    const response = await backEndClient.get(progressNotesURL);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching all progress notes:", error);
    return null;
  }
};

// Fetch progress notes by user ID
export const getProgressNotesByUserId = async (userId) => {
  try {
    const response = await backEndClient.get(`${progressNotesURL}/user/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Ensure the user is logged in and has a valid token.");
    } else {
      console.error("Error fetching progress notes by user ID:", error);
    }
    return null;
  }
};

// Fetch progress note by ID
export const getProgressNoteById = async (id) => {
  try {
    const response = await backEndClient.get(`${progressNotesURL}/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching progress note by ID:", error);
    return null;
  }
};

// Create a new progress note
export const createProgressNote = async (progressNoteDTO) => {
  try {
    // Send POST request with DTO
    const response = await backEndClient.post(progressNotesURL, progressNoteDTO, {
      headers: {
        "Content-Type": "application/json", // Optional if backEndClient is pre-configured
      },
    });

    // Check for successful status codes (200 or 201)
    if (response.status === 200 || response.status === 201) {
      return response.data; // Return the created note
    } else {
      console.error(`Unexpected response status: ${response.status}`);
      return null; // Handle unexpected response
    }
  } catch (error) {
    // Log detailed error information
    if (error.response) {
      console.error(
        `Error creating progress note: ${error.response.status} - ${error.response.data}`
      );
    } else {
      console.error("Error creating progress note:", error.message);
    }

    throw error; // Rethrow the error for upstream handling
  }
};

// Update an existing progress note
export const updateProgressNote = async (progressNoteDTO) => {
  try {
    const response = await backEndClient.put(progressNotesURL, progressNoteDTO, {
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
    console.error("Error updating progress note:", error);
    return null;
  }
};

// Delete a progress note by ID
export const deleteProgressNote = async (id) => {
  try {
    const response = await backEndClient.delete(`${progressNotesURL}/${id}`);
    if (response.status === 204) {
      console.log("Progress note deleted successfully");
      return true;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Error deleting progress note:", error);
    return false;
  }
};
