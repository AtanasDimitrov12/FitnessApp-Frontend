import React, { useState } from 'react';
import Sidebar from './SideBar/SideBar';
import WorkoutCard from './WorkoutCard/WorkoutCard';
import ExercisesSection from './ExerciseSection';
import './WorkoutPage.css';

const WorkoutPage = () => {
  const [activeWorkout, setActiveWorkout] = useState(1);

  const workouts = [
    {
      id: 1,
      name: 'Workout 1',
      picture: '/images/workout-card.jpg',
      description: 'Description for Workout 1',
      exerciseList: [
        { id: 1, name: 'Bench Press', sets: 3, reps: 12 },
        { id: 2, name: 'Squat', sets: 4, reps: 10 },
      ],
    },
    {
      id: 2,
      name: 'Workout 2',
      description: 'Description for Workout 2',
      exerciseList: [
        { id: 3, name: 'Deadlift', sets: 4, reps: 8 },
        { id: 4, name: 'Shoulder Press', sets: 3, reps: 12 },
      ],
    },
    {
      id: 3,
      name: 'Workout 3',
      description: 'Description for Workout 3',
      exerciseList: [
        { id: 2, name: 'Squat', sets: 4, reps: 10 },
        { id: 4, name: 'Shoulder Press', sets: 3, reps: 12 },
      ],
    },
    {
      id: 4,
      name: 'Workout 4',
      description: 'Description for Workout 4',
      exerciseList: [
        { id: 1, name: 'Bench Press', sets: 3, reps: 12 },
        { id: 3, name: 'Deadlift', sets: 4, reps: 8 },
      ],
    },
  ];

  const handleWorkoutChange = (workoutId) => {
    setActiveWorkout(workoutId);
  };

  const activeWorkoutData = workouts.find(workout => workout.id === activeWorkout);

  return (
    <div className="workout-page">
      <Sidebar
        workouts={workouts}
        activeWorkout={activeWorkout}
        onWorkoutChange={handleWorkoutChange}
      />
      <div className="workout-content">
        <WorkoutCard
          workoutData={activeWorkoutData}
        />
        <ExercisesSection exercises={activeWorkoutData.exerciseList} />
      </div>
    </div>
  );
};

export default WorkoutPage;
