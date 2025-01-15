import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar/WorkoutSideBar";
import WorkoutCard from "./WorkoutCard/WorkoutCard";
import ExercisesSection from "./ExerciseSection";
import { getWorkoutPlanByUserId } from "../../repositories/WorkoutPlansRepo";
import "./WorkoutPage.css";

const WorkoutPage = () => {
  const [userId, setUserId] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [activeWorkoutId, setActiveWorkoutId] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const [workoutDone, setWorkoutDone] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { userId } = JSON.parse(storedUser);
      setUserId(userId);
    }
  }, []);

  // Fetch workout plan
  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      if (!userId) return;

      const fetchedPlan = await getWorkoutPlanByUserId(userId);
      if (fetchedPlan?.workouts?.length > 0) {
        setWorkoutPlan(fetchedPlan);
        setActiveWorkoutId(fetchedPlan.workouts[0].id);
      }
    };

    fetchWorkoutPlan();
  }, [userId]);

  // Update workout details when active workout changes
  useEffect(() => {
    if (!activeWorkoutId || !workoutPlan) return;

    const selectedWorkout = workoutPlan.workouts.find(
      (workout) => workout.id === activeWorkoutId
    );
    setWorkoutDetails(selectedWorkout);
    setWorkoutDone(false); // Reset the "done" state when changing workouts
  }, [activeWorkoutId, workoutPlan]);

  // Function to mark the workout as done
  const handleMarkAsDone = () => {
    if (!userId || !workoutPlan || !activeWorkoutId) return;

    setWorkoutDone(true);

    console.log(`Workout ${activeWorkoutId} marked as done!`);
  };

  return (
    <div className="workout-page">
      <Sidebar
        workouts={workoutPlan?.workouts || []}
        activeWorkout={activeWorkoutId}
        onWorkoutChange={setActiveWorkoutId}
      />

      <div className="workout-content">
        {workoutDetails && (
          <WorkoutCard
            workoutData={workoutDetails}
            workoutDone={workoutDone}
            onMarkAsDone={handleMarkAsDone}
          />
        )}
        <ExercisesSection exercises={workoutDetails?.exercises || []} />
      </div>
    </div>
  );
};

export default WorkoutPage;
