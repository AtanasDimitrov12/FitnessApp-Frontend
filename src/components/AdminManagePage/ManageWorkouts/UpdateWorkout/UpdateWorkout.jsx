import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import websocketService from "../../../../services/WebSocketService";
import AddExercise from "../../../AdminCreatePage/CreateWorkout/AddExercise/AddExercise";
import Preview from "../../../AdminCreatePage/CreateWorkout/Preview";
import { updateWorkout, updateWorkoutWithoutPicture } from "../../../../repositories/WorkoutRepo";
import "./UpdateWorkout.css";

const UpdateWorkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const workout = location.state?.workout || {};
  const [workoutData, setWorkoutData] = useState({
    id: workout.id,
    name: workout.name || "",
    description: workout.description || "",
  });
  const [exerciseList, setExerciseList] = useState(workout.exercises || []);
  const [imageFile, setImageFile] = useState(null);
  const [isAddingExercises, setIsAddingExercises] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // Loading state
  const [isPictureUpdated, setIsPictureUpdated] = useState(false); // Track if picture is updated

  // Callback to handle incoming notifications
  const handleNotification = (notification) => {
    console.log("Notification received:", notification);
    // Optional: Display notification to the user
  };

  useEffect(() => {
    // Ensure WebSocket is connected with a callback for notifications
    const userId = 1; // Replace with the actual user ID
    websocketService.connect(userId, handleNotification);

    return () => {
      // Disconnect WebSocket when the component unmounts
      websocketService.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };

  const handleAddExercise = () => {
    setIsAddingExercises(true);
  };

  const handleAddPicture = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImageFile(file);
      setIsPictureUpdated(true); // Mark picture as updated
    } else {
      alert("Please upload a valid JPEG or PNG image.");
    }
  };

  const handleSaveExercises = (exerciseIds) => {
    setExerciseList(exerciseIds); // Clear existing exercises and set new ones
    setIsAddingExercises(false);
  };

  const handleUpdate = async () => {
    setIsUpdating(true); // Start loading state
    try {
      const updatedWorkoutData = {
        ...workoutData,
        exercises: exerciseList,
      };

      let response;

      if (isPictureUpdated) {
        // Update with picture
        response = await updateWorkout(updatedWorkoutData, imageFile);
      } else {
        console.log("The program sends this request: ", updatedWorkoutData);
        // Update without picture
        response = await updateWorkoutWithoutPicture(updatedWorkoutData);
      }

      if (response) {
        console.log("Workout updated successfully:", response);

        // Send WebSocket notification using the external service
        websocketService.sendNotification("/app/update-workout", {
          workoutId: workoutData.id,
          workoutName: workoutData.name,
        });

        navigate("/admin-manage"); // Redirect to the ManageWorkouts page
      } else {
        console.error("Failed to update workout.");
      }
    } catch (error) {
      console.error("Error updating workout:", error);
    } finally {
      setIsUpdating(false); // End loading state
    }
  };

  return (
    <div className="update-workout-page">
      {isAddingExercises ? (
        <AddExercise onSave={handleSaveExercises} />
      ) : (
        <>
          <div className="update-workout-content">
            {/* Form on the left */}
            <div className="update-workout-form">
              <h3>Update Workout</h3>
              <label htmlFor="name">Workout Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={workoutData.name}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={workoutData.description}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="picture">Upload New Image:</label>
              <input
                type="file"
                id="picture"
                name="picture"
                accept="image/jpeg, image/png"
                onChange={handleAddPicture}
              />

              <button className="add-exercise-button" onClick={handleAddExercise}>
                Add/Update Exercises
              </button>
            </div>

            {/* Preview on the right */}
            <div className="preview-container">
              <Preview
                workoutData={workoutData}
                exerciseList={exerciseList}
                imageFile={imageFile}
                pictureURL={workout.pictureURL}
              />
            </div>
          </div>

          {/* Update button centered below */}
          <button
            className="update-button"
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Workout"}
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateWorkout;
