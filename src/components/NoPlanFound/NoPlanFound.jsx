import React from "react";
import { useNavigate } from "react-router-dom";
import "./NoPlanFound.css"; // Import the CSS file for styling

const NoPlanFound = ({ type }) => {
  const navigate = useNavigate();

  // Determine the message and redirection path
  const isMealPlan = type === "meal";
  const message = isMealPlan
    ? "No meals found for your diet. Start by selecting a meal plan!"
    : "No workout plan found. Begin your fitness journey now!";
  const buttonLabel = isMealPlan ? "Create Meal Plan" : "Create Workout Plan";
  const redirectPath = isMealPlan ? "/user-profile" : "/user-profile";

  return (
    <div className="page-container">
        <div className="no-plan-container">
        <h2>{message}</h2>
        <p>
            Don't worry! You can create a custom plan in your profile page.
        </p>
        <button className="cta-button" onClick={() => navigate(redirectPath)}>
            {buttonLabel}
        </button>
        </div>
    </div>
  );
};

export default NoPlanFound;
