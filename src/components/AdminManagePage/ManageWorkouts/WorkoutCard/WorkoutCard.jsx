import React, { useState } from "react";
import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./WorkoutCard.css";

const WorkoutCard = ({ workoutData, exerciseList, imageURL, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="workout-card">
      <div className="workout-image-container">
        {imageURL ? (
          <img src={imageURL} alt="Workout" className="workout-image" />
        ) : (
          <p className="no-image-text">No Image Added</p>
        )}
      </div>
      <h3 className="workout-title">{workoutData.name || "Untitled Workout"}</h3>
      <p className="workout-description">
        {workoutData.description || "No description provided for this workout."}
      </p>

      {/* Collapsible Exercise List */}
      <div className="exercise-list-container">
        <button className="toggle-exercise-button" onClick={toggleExpanded}>
          {isExpanded ? (
            <>
              <FaChevronUp /> Hide Exercises
            </>
          ) : (
            <>
              <FaChevronDown /> View Exercises
            </>
          )}
        </button>
        {isExpanded && (
          <ul className="exercise-list">
            {exerciseList.length > 0 ? (
              exerciseList.map((exercise, index) => (
                <li key={index} className="exercise-item">
                  {exercise.name} - {exercise.sets} sets x {exercise.reps} reps
                </li>
              ))
            ) : (
              <li className="no-exercise-text">No Exercises Added</li>
            )}
          </ul>
        )}
      </div>

      <div className="workout-card-buttons">
        <button className="workout-edit-button" onClick={onEdit} title="Edit Workout">
          <FaEdit /> Edit
        </button>
        <button className="workout-delete-button" onClick={onDelete} title="Delete Workout">
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
