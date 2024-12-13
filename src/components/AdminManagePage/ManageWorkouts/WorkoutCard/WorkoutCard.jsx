import React, { useState } from "react";
import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./WorkoutCard.css";

const WorkoutCard = ({ workoutData, exerciseList, imageURL, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="workout-card">
      {/* Workout Image */}
      <div className="workout-image-container">
        {imageURL ? (
          <img src={imageURL} alt={`${workoutData.name || "Workout"} Image`} className="workout-image" />
        ) : (
          <p className="no-image-text">No Image Added</p>
        )}
      </div>

      {/* Workout Title and Description */}
      <h3 className="workout-title">{workoutData.name || "Untitled Workout"}</h3>
      <p className="workout-description">
        {workoutData.description || "No description provided for this workout."}
      </p>

      {/* Collapsible Exercise List */}
      <div className="exercise-list-container">
        <button
          className="toggle-exercise-button"
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-controls="exercise-list"
        >
          <span>
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            {isExpanded ? " Hide Exercises" : " View Exercises"}
          </span>
        </button>
        {isExpanded && exerciseList.length > 0 && (
          <ul className="exercise-list" id="exercise-list">
            {exerciseList.map((exercise, index) => (
              <li key={index} className="exercise-item">
                {/* Access specific fields of the exercise object */}
                {exercise.name} - {exercise.sets} sets x {exercise.reps} reps
              </li>
            ))}
          </ul>
        )}
        {isExpanded && exerciseList.length === 0 && (
          <p className="no-exercise-text">No Exercises Added</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="workout-card-buttons">
        <button
          className="workout-edit-button"
          onClick={onEdit}
          title="Edit Workout"
        >
          <FaEdit />
          <span> Edit</span>
        </button>
        <button
          className="workout-delete-button"
          onClick={onDelete}
          title="Delete Workout"
        >
          <FaTrash />
          <span> Delete</span>
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
