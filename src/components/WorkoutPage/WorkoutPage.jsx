import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar/WorkoutSideBar";
import WorkoutCard from "./WorkoutCard/WorkoutCard";
import ExercisesSection from "./ExerciseSection";
import { getWorkoutPlanByUserId } from "../../repositories/WorkoutPlansRepo";
import { markWorkoutAsDone, fetchWorkoutStatus } from "../../repositories/WorkoutStatusRepo";
import NoPlanFound from "../NoPlanFound/NoPlanFound"
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
        setLoading(true);
        const fetchedPlan = await getWorkoutPlanByUserId(userId);
        if (fetchedPlan?.workouts?.length > 0) {
          setWorkoutPlan(fetchedPlan);
          setActiveWorkoutId(fetchedPlan.workouts[0].id);
        } else {
          setError("No workouts found for this user."); // ✅ Ensure error state is set
        }
      } catch (error) {
        setError("Failed to fetch workout plan."); // ✅ Ensure error state is set
        console.error(error);
      } finally {
        setLoading(false);
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

    // **Call `fetchWorkoutStatus` and update state**
    const getWorkoutStatus = async () => {
      try {
        const response = await fetchWorkoutStatus(workoutPlan.id, activeWorkoutId);
        setWorkoutDone(response.isDone); // ✅ Correct state update
      } catch (error) {
        console.error("Failed to fetch workout status:", error);
        setWorkoutDone(false);
      }
    };

    getWorkoutStatus(); // ✅ Call function correctly
  }, [activeWorkoutId, workoutPlan]);

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
    <div className={`workout-page ${error || (!workoutPlan?.workouts?.length) ? "full-screen" : ""}`}>
      {loading && <div>Loading...</div>}
  
      {error && <NoPlanFound type="workout" />}
      
      {!loading && !error && workoutPlan?.workouts?.length === 0 && (
        <NoPlanFound type="workout" />
      )}
  
      {!loading && !error && workoutPlan?.workouts?.length > 0 && (
        <>
          <Sidebar
            workouts={workoutPlan.workouts}
            activeWorkout={activeWorkoutId}
            onWorkoutChange={setActiveWorkoutId}
          />
  
          <div className="workout-content">
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
        </>
      )}
    </div>
  );
};  

export default WorkoutPage;
