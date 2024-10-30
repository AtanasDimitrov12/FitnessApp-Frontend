import React from "react";
import "./StepCard.css";

const StepCard = ({ stepNumber, title, description, highlight }) => {
  return (
    <div className="step-card">
      <h3>
        <span className="step-number">{stepNumber}.</span>{" "}
        <span className={`step-title ${highlight ? "highlight" : ""}`}>{title}</span>
      </h3>
      <p>{description}</p>
    </div>
  );
};

export default StepCard;
