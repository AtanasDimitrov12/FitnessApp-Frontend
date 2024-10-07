import React, { useState } from "react";
import UserRegisterForm from "./UserRegisterForm"; 
import TrainerRegisterForm from "./TrainerRegisterForm"; 
import "./Register.css";

const Register = () => {
  const [activeForm, setActiveForm] = useState("user"); 

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      
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

      {activeForm === "user" ? <UserRegisterForm /> : <TrainerRegisterForm />}
    </div>
  );
};

export default Register;
