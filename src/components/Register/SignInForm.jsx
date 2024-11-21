import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { login } from '../../repositories/AuthRepo';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Both username and password are required.");
      return;
    }

    try {
      const response = await login({ username, password });
      if (response) {
        toast.success("Login successful!");

        const token = response.token;
        const roles = response.role;
        const id = response.id;

        // Corrected logging
        console.log("Login successful, role:", roles);

        if (roles === "User") {
          navigate("/user-profile");
        } else if (roles === "Admin") {
          navigate("/admin-craete");
        } else {
          throw new Error(`Invalid role: ${roles}`);
        }
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("An unexpected error occurred. Please try again later.");
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
