import React, { useEffect, useState } from "react";
import { updateUser, uploadProfilePicture } from "../../../repositories/UserRepo";
import { getCompletedWorkouts } from "../../../repositories/UserRepo";
import { fetchWorkoutStatus } from "../../../repositories/WorkoutStatusRepo"; // ✅ Import method
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfileInformation.css";

const ProfileInformation = ({ user }) => {
  const defaultPicURL = "http://res.cloudinary.com/dgovaqahy/image/upload/v1734119140/imk3zarp0oeispqsyxdi.jpg";
  const [userData, setUserData] = useState(user);
  const [previewURL, setPreviewURL] = useState(user.pictureURL ?? defaultPicURL);
  const [finishedWorkouts, setFinishedWorkouts] = useState(0);
  const [lastWorkout, setLastWorkout] = useState("Loading...");
  const [nextWorkout, setNextWorkout] = useState("Loading...");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewURL(URL.createObjectURL(file));
      try {
        const uploadResponse = await uploadProfilePicture(user.id, file);
        setUserData({ ...userData, pictureURL: uploadResponse.pictureURL });
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        toast.error("Failed to upload profile picture. Please try again.");
        console.error("Image upload error:", error);
        setPreviewURL(user.pictureURL ?? defaultPicURL);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const rangeType = "month"; // Example range type: "month", "quarter", "year"
      try {
        const completedWorkouts = await getCompletedWorkouts(userData.id, rangeType);
        if (completedWorkouts !== null) {
          setFinishedWorkouts(completedWorkouts);
        } else {
          console.error("Failed to fetch completed workouts.");
        }
      } catch (error) {
        console.error("Error fetching completed workouts:", error);
      }
    };

    fetchData();
  }, [userData.id]);

  // Fetch last and next workout status
  useEffect(() => {
    const fetchWorkoutData = async () => {
      if (!user.workoutPlan || !user.workoutPlan.workouts?.length) {
        setLastWorkout("No completed workouts");
        setNextWorkout("No upcoming workouts");
        return;
      }

      const workouts = user.workoutPlan.workouts;

      // **Check each workout's status**
      let lastDoneWorkout = null;
      let nextUndoneWorkout = null;

      for (const workout of workouts) {
        try {
          const response = await fetchWorkoutStatus(user.workoutPlan.id, workout.id);
          if (response.isDone) {
            lastDoneWorkout = workout.name;
          } else if (!nextUndoneWorkout) {
            nextUndoneWorkout = workout.name;
          }
        } catch (error) {
          console.error(`Error fetching status for workout ${workout.id}:`, error);
        }
      }

      setLastWorkout(lastDoneWorkout || "No completed workouts");
      setNextWorkout(nextUndoneWorkout || "No upcoming workouts");
    };

    fetchWorkoutData();
  }, [user.workoutPlan]); // Re-fetch when workout plan changes

  return (
    <div className="profile-information">
      <ToastContainer />
      <div className="header-section">
        <h2>Welcome, {userData.username}</h2>
        <div className="profile-picture-wrapper">
          <img src={previewURL} alt="Profile" className="profile-picture" />
          <div className="profile-picture-overlay">
            <label className="upload-label">
              Upload Picture
              <input
                type="file"
                id="fileInput"
                className="hidden-file-input"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="basic-info card">
          <h3>Basic info:</h3>
          <p>Weight: {user.notes.length > 0 ? user.notes[user.notes.length - 1].weight : "No data available"} kg</p>
          <p>Last workout: {lastWorkout}</p>
          <p>Next workout: {nextWorkout}</p>
          <p>Finished workouts: {finishedWorkouts}</p>
        </div>
        <div className="credentials card">
          <h3>Credentials:</h3>
          <p>Email: {user.email}</p>
          <p>Username: {userData.username}</p>
          <p>Password: ********</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
