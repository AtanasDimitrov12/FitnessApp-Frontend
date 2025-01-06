import React from "react";
import "./WorkoutCard.css";

const WorkoutCard = ({ workoutData, workoutDone, onMarkAsDone }) => {
  if (!workoutData) return null;

  const formatEnumName = (enumName) =>
    enumName
      .toLowerCase()
      .replace("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const renderTags = (items, activeItems) =>
    items.map((item, index) => (
      <span
        key={index}
        className={`badge ${activeItems.includes(item) ? "active" : ""}`}
      >
        {formatEnumName(item)}
      </span>
    ));

  return (
    <div className="workout-card">
      <div className="workout-details">
        <h3>{workoutData.name}</h3>
        <p>{workoutData.description || "This place here is for the description"}</p>
        <div className="workout-tags">
          <div className="tag-section">
            <p>Fitness goal:</p>
            {renderTags(
              ["WEIGHT_LOSS", "MUSCLE_GAIN", "MAINTENANCE"],
              workoutData.fitnessGoals
            )}
          </div>
          <div className="tag-section">
            <p>Fitness level:</p>
            {renderTags(
              ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
              workoutData.fitnessLevels
            )}
          </div>
          <div className="tag-section">
            <p>Training style:</p>
            {renderTags(["STRENGTH", "ENDURANCE"], workoutData.trainingStyles)}
          </div>
        </div>
      </div>
      <div className="workout-image">
        <img
          src={workoutData.pictureURL || "https://via.placeholder.com/150"}
          alt="Workout"
        />
      </div>
      <div className="workout-actions">
        {!workoutDone ? (
          <button className="mark-done-button" onClick={onMarkAsDone}>
            Mark as Done
          </button>
        ) : (
          <p className="done-message">This workout is marked as done!</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
