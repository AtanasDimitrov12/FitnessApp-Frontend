import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from '../../repositories/AuthRepo';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;

    // Username: Only letters, minimum 3 characters
    const usernameRegex = /^[A-Za-z]{3,}$/;
    if (!usernameRegex.test(username)) {
      toast.error("Username must contain only letters and be at least 3 characters long.", { position: "top-center" });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", { position: "top-center" });
      return false;
    }

    // Password: Minimum 8 characters
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.", { position: "top-center" });
      return false;
    }

    // Confirm password matches password
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", { position: "top-center" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await registerUser(formData);
        if (response) {
          toast.success("Signup successful!", { position: "top-center" });
          console.log("Form Data:", formData);

          // Reset form
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          toast.error("Signup failed. Please try again.", { position: "top-center" });
        }
      } catch (error) {
        toast.error("An error occurred during signup. Please try again.", { position: "top-center" });
        console.error("Signup error:", error);
      }
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
        <h1 className='register-form'>Sign Up</h1>
        <div className="social-container">
          <a href="#" className="social"><FaFacebook /></a>
          <a href="#" className="social"><FaGoogle /></a>
          <a href="#" className="social"><FaLinkedin /></a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
