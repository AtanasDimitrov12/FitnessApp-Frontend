import React from "react";
import WorkoutCard from "./WorkoutCard"; // Import the WorkoutCard component
import "./WorkoutPage.css"; // Import the external CSS file for styling

const workouts = [
    {
      name: "Full Body Workout",
      description: "A complete workout for all major muscle groups.",
      exercises: [
        { name: "Push-ups" },
        { name: "Squats" },
        { name: "Lunges" },
        { name: "Plank" },
      ],
    },
    {
      name: "Upper Body Strength",
      description: "Focuses on building strength in the upper body muscles.",
      exercises: [
        { name: "Bench Press" },
        { name: "Bicep Curls" },
        { name: "Tricep Dips" },
        { name: "Shoulder Press" },
      ],
    },
    {
      name: "Core and Abs",
      description: "Targets the core muscles to improve stability and strength.",
      exercises: [
        { name: "Plank" },
        { name: "Russian Twists" },
        { name: "Leg Raises" },
        { name: "Side Plank" },
      ],
    },
    {
      name: "Lower Body Blast",
      description: "Strengthens and tones the legs and glutes.",
      exercises: [
        { name: "Squats" },
        { name: "Lunges" },
        { name: "Deadlifts" },
        { name: "Glute Bridges" },
      ],
    },
    {
      name: "HIIT Workout",
      description: "High-intensity interval training for fat burn and endurance.",
      exercises: [
        { name: "Burpees" },
        { name: "Jumping Jacks" },
        { name: "Mountain Climbers" },
        { name: "High Knees" },
      ],
    },
    {
      name: "Cardio Endurance",
      description: "A workout designed to increase cardiovascular endurance.",
      exercises: [
        { name: "Running" },
        { name: "Cycling" },
        { name: "Jump Rope" },
        { name: "Rowing" },
      ],
    },
    {
      name: "Flexibility and Stretching",
      description: "Improves flexibility and range of motion.",
      exercises: [
        { name: "Hamstring Stretch" },
        { name: "Quad Stretch" },
        { name: "Shoulder Stretch" },
        { name: "Child's Pose" },
      ],
    },
    {
      name: "Back and Shoulders",
      description: "Strengthens the back and shoulder muscles.",
      exercises: [
        { name: "Pull-ups" },
        { name: "Dumbbell Rows" },
        { name: "Shoulder Press" },
        { name: "Lateral Raises" },
      ],
    },
    {
      name: "Leg Day",
      description: "Focuses on building strength in the lower body.",
      exercises: [
        { name: "Squats" },
        { name: "Leg Press" },
        { name: "Calf Raises" },
        { name: "Leg Extensions" },
      ],
    },
    {
      name: "Bodyweight Basics",
      description: "A workout using only bodyweight exercises.",
      exercises: [
        { name: "Push-ups" },
        { name: "Squats" },
        { name: "Lunges" },
        { name: "Plank" },
      ],
    },
  ];
  

const WorkoutPage = () => {
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
