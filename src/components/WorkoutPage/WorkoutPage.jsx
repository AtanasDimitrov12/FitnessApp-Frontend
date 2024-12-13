import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard/WorkoutCard"; 
import "./WorkoutPage.css";
import { getWorkouts, deleteWorkout } from "../../repositories/WorkoutRepo"; 

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


  const handleDelete = async (id) => {
    const success = await deleteWorkout(id);
    if (success) {
      setWorkouts(workouts.filter((workout) => workout.id !== id)); 
    } else {
      alert("Failed to delete workout");
    }
  };


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
          <WorkoutCard key={workout.id} workout={workout} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default WorkoutPage;
