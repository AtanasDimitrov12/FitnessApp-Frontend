import backEndClient from './axiosClient';

const usersURL = "/api/users";

// Fetch a user by ID
export const getUserById = async (id) => {
  try {
    const response = await backEndClient.get(`${usersURL}/${id}`);
    return response.data; // Return data directly if successful
  } catch (error) {
    handleRequestError("Error fetching user by ID", error);
    return null;
  }
};

// Update a user
export const updateUser = async (userDTO) => {
    try {
      const response = await backEndClient.put(usersURL, userDTO);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error.response || error.message);
      throw error; // Re-throw error for the caller to handle
    }
  };

// Fetch all users (Admin only)
export const getAllUsers = async () => {
  try {
    const response = await backEndClient.get(usersURL);
    return response.data; // Return the list of users if successful
  } catch (error) {
    handleRequestError("Error fetching all users", error);
    return null;
  }
};

// Delete a user (Admin only)
export const deleteUser = async (id) => {
  try {
    const response = await backEndClient.delete(`${usersURL}/${id}`);
    if (response.status === 204) {
      console.log("User deleted successfully");
      return true;
    }
    console.error(`Unexpected response status: ${response.status}`);
    return false;
  } catch (error) {
    handleRequestError("Error deleting user", error);
    return false;
  }
};

// Utility function for handling and logging request errors
const handleRequestError = (message, error) => {
  console.error(`${message}:`, error.response || error.message);
};
