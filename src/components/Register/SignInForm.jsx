import React, { useState, useContext } from "react";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { login } from "../../repositories/AuthRepo"; // Import login function
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../UserContext"; // Import UserContext

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Access UserContext to update user state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Both username and password are required.", { position: "top-center" });
      return;
    }

    try {
      const response = await login({ username, password });

      if (response && response.token) {
        // Decode the token
        const decodedToken = jwtDecode(response.token);

        // Validate token payload
        const { sub: username, roles, userId, exp } = decodedToken;

        if (!username || !roles || !userId || !exp) {
          toast.error("Invalid token. Please contact support.", { position: "top-center" });
          return;
        }

        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (exp < currentTime) {
          toast.error("Session expired. Please log in again.", { position: "top-center" });
          return;
        }

        // Store token and user data in localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username,
            roles,
            userId,
          })
        );

        // Update UserContext state
        setUser({
          username,
          roles,
          userId,
        });

        toast.success("Login successful!", { position: "top-center" });

        // Navigate based on user role
        if (roles.includes("USER")) {
          navigate("/user-profile");
        } else if (roles.includes("ADMIN")) {
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
        <h1 className="register-form">Sign In</h1>
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
