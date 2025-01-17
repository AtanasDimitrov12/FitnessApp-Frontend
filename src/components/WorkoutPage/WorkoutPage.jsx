import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar/WorkoutSideBar";
import WorkoutCard from "./WorkoutCard/WorkoutCard";
import ExercisesSection from "./ExerciseSection";
import { getWorkoutPlanByUserId } from "../../repositories/WorkoutPlansRepo";
import { markWorkoutAsDone } from "../../repositories/WorkoutStatusRepo";
import backEndClient from "../../repositories/axiosClient"; // Axios client
import "./WorkoutPage.css";

const WorkoutPage = () => {
  const [userId, setUserId] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [activeWorkoutId, setActiveWorkoutId] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const [workoutDone, setWorkoutDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { userId } = JSON.parse(storedUser);
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      if (!userId) return;
      try {
        const fetchedPlan = await getWorkoutPlanByUserId(userId);
        if (fetchedPlan?.workouts?.length > 0) {
          setWorkoutPlan(fetchedPlan);
          setActiveWorkoutId(fetchedPlan.workouts[0].id);
        }
      } catch (error) {
        setError("Failed to fetch workout plan.");
        console.error(error);
      }
    };

    fetchWorkoutPlan();
  }, [userId]);

  useEffect(() => {
    if (!activeWorkoutId || !workoutPlan) return;

    const selectedWorkout = workoutPlan.workouts.find(
      (workout) => workout.id === activeWorkoutId
    );
    setWorkoutDetails(selectedWorkout);

    // Fetch workout status from backend
    fetchWorkoutStatus(workoutPlan.id, activeWorkoutId);
  }, [activeWorkoutId, workoutPlan]);

  // Function to fetch if the workout is already marked as done
  const fetchWorkoutStatus = async (workoutPlanId, workoutId) => {
    try {
      const response = await backEndClient.get(`/api/workout-status`, {
        params: { workoutPlanId, workoutId}
      });

      setWorkoutDone(response.data.isDone); // Set workoutDone based on backend response
    } catch (error) {
      console.error("Failed to fetch workout status:", error);
      setWorkoutDone(false); // Default to false if an error occurs
    }
  };

  const handleMarkAsDone = async () => {
    if (!userId || !workoutPlan || !activeWorkoutId) return;

    setLoading(true);
    setError(null);

    try {
      await markWorkoutAsDone(workoutPlan.id, activeWorkoutId, userId);
      setWorkoutDone(true);
    } catch (error) {
      setError("Failed to mark workout as done.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workout-page">
      <Sidebar
        workouts={workoutPlan?.workouts || []}
        activeWorkout={activeWorkoutId}
        onWorkoutChange={setActiveWorkoutId}
      />

      <div className="workout-content">
        {error && <p className="error-message">{error}</p>}
        {workoutDetails && (
          <WorkoutCard
            workoutData={workoutDetails}
            workoutDone={workoutDone}
            onMarkAsDone={handleMarkAsDone}
            loading={loading}
          />
        )}
        <ExercisesSection exercises={workoutDetails?.exercises || []} />
      </div>
    </div>
  );
};

export default WorkoutPage;
