import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { login } from '../../repositories/AuthRepo'; // Import login function
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Both username and password are required.", { position: "top-center" });
      return;
    }

    try {
      const response = await login({ username, password });

      if (response && response.token && response.role) {
        toast.success("Login successful!", { position: "top-center" });

        // Save token to localStorage or another secure storage mechanism
        localStorage.setItem("token", response.token);

        // Navigate based on role
        if (response.role === "User") {
          navigate("/user-profile");
        } else if (response.role === "Admin") {
          navigate("/admin-create");
        } else {
          toast.error("Unknown role. Please contact support.", { position: "top-center" });
        }
      } else {
        toast.error("Invalid username or password. Please try again.", { position: "top-center" });
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("An unexpected error occurred. Please try again later.", { position: "top-center" });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1 className='register-form'>Sign In</h1>
        <div className="social-container">
          <a href="#" className="social"><FaFacebook /></a>
          <a href="#" className="social"><FaGoogle /></a>
          <a href="#" className="social"><FaLinkedin /></a>
        </div>
        <span>or use your account</span>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
