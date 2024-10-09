import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard"; 
import "./WorkoutPage.css";
import { getWorkout } from "../../repositories/WorkoutRepo"; 

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getWorkout(); 
        setWorkouts(data); 
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch workouts");
        setLoading(false);
        
      }
    };

    fetchWorkouts(); 
  }, []);


  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
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
