import React, { useState } from 'react';
import Sidebar from './SideBar/SideBar';
import WorkoutCard from './WorkoutCard/WorkoutCard';
import ExercisesSection from './ExerciseSection';
import './WorkoutPage.css';

const WorkoutPage = () => {
  const [activeWorkout, setActiveWorkout] = useState(1);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseVideo, setExerciseVideo] = useState('');

  // Hardcoded workouts data
  const workouts = [
    {
      id: 1,
      name: 'Full Body Workout',
      description: 'A comprehensive workout targeting all major muscle groups.',
      pictureURL: '/images/full-body-workout.jpg', // Replace with actual image path
      exercises: [
        { 
          id: 1, 
          name: 'Bench Press', 
          sets: 3, 
          reps: 12, 
          gifUrl: 'https://example.com/bench-press.gif' // Replace with actual GIF URL
        },
        { 
          id: 2, 
          name: 'Squat', 
          sets: 4, 
          reps: 10, 
          gifUrl: 'https://example.com/squat.gif' // Replace with actual GIF URL
        },
        { 
          id: 3, 
          name: 'Deadlift', 
          sets: 3, 
          reps: 8, 
          gifUrl: 'https://example.com/deadlift.gif' // Replace with actual GIF URL
        },
      ],
      workoutPlans: [],
    },
    {
      id: 2,
      name: 'Upper Body Strength',
      description: 'An upper body workout focusing on arms, chest, and shoulders.',
      pictureURL: '/images/upper-body-workout.jpg', // Replace with actual image path
      exercises: [
        { 
          id: 4, 
          name: 'Bicep Curl', 
          sets: 3, 
          reps: 10, 
          gifUrl: 'https://example.com/bicep-curl.gif' // Replace with actual GIF URL
        },
        { 
          id: 5, 
          name: 'Tricep Extension', 
          sets: 3, 
          reps: 12, 
          gifUrl: 'https://example.com/tricep-extension.gif' // Replace with actual GIF URL
        },
        { 
          id: 6, 
          name: 'Shoulder Press', 
          sets: 4, 
          reps: 8, 
          gifUrl: 'https://example.com/shoulder-press.gif' // Replace with actual GIF URL
        },
      ],
      workoutPlans: [],
    },
    // Additional hardcoded workouts can be added here
  ];

  const handleWorkoutChange = (workoutId) => {
    setActiveWorkout(workoutId);
    setSelectedExercise(null);
    setExerciseVideo(''); // Reset video when switching workouts
  };

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise.name);
    setExerciseVideo(exercise.gifUrl || '');
  };

  const activeWorkoutData = workouts.find((workout) => workout.id === activeWorkout);

  return (
    <div className="workout-page">
      <Sidebar
        workouts={workouts}
        activeWorkout={activeWorkout}
        onWorkoutChange={handleWorkoutChange}
      />
      <div className="workout-content">
        {activeWorkoutData && (
          <>
            <WorkoutCard workoutData={activeWorkoutData} />
            <ExercisesSection
              exercises={activeWorkoutData.exercises || []}
              onExerciseSelect={handleExerciseSelect}
            />
          </>
        )}
        {exerciseVideo && (
          <div className="exercise-video">
            <h3>{selectedExercise}</h3>
            {exerciseVideo ? (
              <img src={exerciseVideo} alt={selectedExercise} />
            ) : (
              <p>No video available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPage;
