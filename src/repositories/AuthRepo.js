import backEndClient from './axiosClient';

const authURL = "/auth";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await backEndClient.post(`${authURL}/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log("User registered successfully");
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

// Login (User or Admin)
export const login = async (credentials) => {
    try {
      const response = await backEndClient.post('/auth/login', credentials, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // Contains id, role, and token
    } catch (error) {
      console.error("Login error:", error);
      return null; // Ensure null is returned on failure
    }
  };
