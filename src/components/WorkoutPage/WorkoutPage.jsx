import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar/SideBar";
import WorkoutCard from "./WorkoutCard/WorkoutCard";
import ExercisesSection from "./ExerciseSection";
import websocketService from "../../websocketService";
import { getWorkoutPlanByUserId } from "../../repositories/WorkoutPlansRepo";
import "./WorkoutPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkoutPage = () => {
  const [userId, setUserId] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [activeWorkoutId, setActiveWorkoutId] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // Fetch and set user ID
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { userId } = JSON.parse(storedUser);
      setUserId(userId);
  
      try {
        // Connect to WebSocket for notifications
        websocketService.connect(userId, (notification) => {
          console.log("Notification received:", notification);
          toast.success(notification.message); // Display notification
        });
      } catch (error) {
        console.error("WebSocket connection failed:", error);
      }
    } else {
      setError("User data not found in session.");
      setLoading(false);
    }
  
    // Cleanup WebSocket on component unmount
    return () => {
      console.log("Cleaning up WebSocket connection...");
      websocketService.disconnect();
    };
  }, []);
  

  // Fetch workout plan for the user
  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const fetchedPlan = await getWorkoutPlanByUserId(userId);
        if (fetchedPlan?.workouts?.length > 0) {
          setWorkoutPlan(fetchedPlan);
          setActiveWorkoutId(fetchedPlan.workouts[0].id);
        } else {
          setError("No workouts found for the user's plan.");
        }
      } catch (err) {
        console.error("Error fetching workout plan:", err);
        setError("Failed to load workout plan. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, [userId]);

  // Update workout details when the active workout changes
  useEffect(() => {
    if (!activeWorkoutId || !workoutPlan) return;

    const selectedWorkout = workoutPlan.workouts.find(
      (workout) => workout.id === activeWorkoutId
    );
    setWorkoutDetails(selectedWorkout);
  }, [activeWorkoutId, workoutPlan]);

  // Handle workout change from the sidebar
  const handleWorkoutChange = (workoutId) => {
    setActiveWorkoutId(workoutId);
    setWorkoutDetails(null);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!workoutDetails) return <div>No workout details available</div>;

  return (
    <div className="workout-page">
      <Sidebar
        workouts={workoutPlan.workouts}
        activeWorkout={activeWorkoutId}
        onWorkoutChange={handleWorkoutChange}
      />
  
      <div className="workout-details-container">
        <WorkoutCard
          key={workoutDetails.id}
          workoutData={workoutDetails}
          workoutPlanId={workoutPlan.id}
          userId={userId}
        />
  
        <ExercisesSection
          exercises={workoutDetails?.exercises || []}
          onExerciseSelect={(exerciseName) =>
            console.log(`Exercise Selected: ${exerciseName}`)
          }
        />
      </div>
  
      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </div>
  );
  
};

export default WorkoutPage;
