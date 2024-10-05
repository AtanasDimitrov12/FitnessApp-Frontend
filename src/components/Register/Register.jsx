import React, { useState } from "react";
import UserRegisterForm from "./UserRegisterForm"; // Import User Register Form
import TrainerRegisterForm from "./TrainerRegisterForm"; // Import Trainer Register Form
import "./Register.css";

const Register = () => {
  const [activeForm, setActiveForm] = useState("user"); // Default to User register form

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      
      {/* Sub-navigation for switching between User and Trainer forms */}
      <div className="register-nav">
        <button
          className={activeForm === "user" ? "active" : ""}
          onClick={() => setActiveForm("user")}
        >
          User Register
        </button>
        <button
          className={activeForm === "trainer" ? "active" : ""}
          onClick={() => setActiveForm("trainer")}
        >
          Trainer Register
        </button>
      </div>

      {/* Dynamically load either User or Trainer form */}
      {activeForm === "user" ? <UserRegisterForm /> : <TrainerRegisterForm />}
    </div>
  );
};

export default Register;
