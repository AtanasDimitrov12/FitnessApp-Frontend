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
    console.error("Error fetching progress notes by user ID:", error);
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
    const response = await backEndClient.post(progressNotesURL, progressNoteDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error creating progress note:", error);
    return null;
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
