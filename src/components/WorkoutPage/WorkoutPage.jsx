import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard"; 
import "./WorkoutPage.css";
import { getTodos } from "../services/yourServiceFile"; // Update the path to where your service is located

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]); // State to hold fetched workout data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null);     // State to manage errors

  // Fetch workouts from the backend using getTodos function
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getTodos(); // Call the service to fetch data
        setWorkouts(data); // Set the fetched data to workouts state
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch workouts");
        setLoading(false);
      }
    };

    fetchWorkouts(); // Call the function to fetch data when the component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's any
  }

  return (
    <div className="workout-page">
      <h1 className="page-title">Workout Plans</h1>
      <div className="workout-list">
        {workouts.map((workout, index) => (
          <WorkoutCard key={index} workout={workout} />
        ))}
      </div>
    </div>
  );
};

export default WorkoutPage;
