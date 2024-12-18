import React, { useState } from "react";
import "./WorkoutCard.css";
import websocketService from "../../../websocketService";

const WorkoutCard = ({ workoutData, workoutPlanId, userId, onWorkoutDone }) => {
  const [isSending, setIsSending] = useState(false); // State to manage button click feedback

  if (!workoutData) {
    return <div>Loading...</div>;
  }

  // Handle marking a workout as done
  const handleMarkAsDone = () => {
    if (!userId || !workoutPlanId) {
      console.error("User ID or Workout Plan ID is missing.");
      return;
    }

    setIsSending(true); // Prevent multiple clicks
    try {
      websocketService.sendWorkoutDone(workoutPlanId, workoutData.id, userId);
      console.log("Workout marked as done:", workoutData.id);
      onWorkoutDone(workoutData.id); // Update UI
    } catch (error) {
      console.error("Failed to send workout completion:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="workout-card-User">
      <div className="workout-image-container">
        {workoutData.pictureURL ? (
          <img
            src={workoutData.pictureURL}
            alt="Workout"
            className="workout-image"
          />
        ) : (
          <p>No Image Added</p>
        )}
      </div>
      <h3>{workoutData.name || "Title"}</h3>
      <p>{workoutData.description || "This place here is for the description"}</p>

      <button
        className="mark-done-btn"
        onClick={handleMarkAsDone}
        disabled={isSending} // Disable button while sending
      >
        {isSending ? "Marking..." : "Mark as Done"}
      </button>
    </div>
  );
};

export default WorkoutCard;
