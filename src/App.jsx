import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
// import './App.css'
import WorkoutPage from './components/WorkoutPage'
import Header from './components/Header'
import HomePage from './components/HomePage';

function App() {
  const workout = {
    name: "Full Body Workout",
    description: "A complete workout for all major muscle groups.",
    exercises: [
      { name: "Push-ups" },
      { name: "Squats" },
      { name: "Lunges" },
      { name: "Plank" },
    ],
  };

  return (
    <>
      <Header />

      <main id="main-content">
        <Routes>
          {/* Render HomePage component for the root path */}
          <Route path="/" element={<HomePage />} />
          {/* Render WorkoutPage component */}
          <Route path="/workouts" element={<WorkoutPage />} />
          {/* Uncomment and add more routes when necessary */}
          {/* <Route path="/workouts" element={<WorkoutCatalog />} />
          <Route path="/workouts/:workoutId" element={<WorkoutDetails />} />
          <Route path="/trainers" element={<ListTrainers />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/trainer-profile" element={<TrainersProfile />} />
          <Route path="/create-workouts" element={<CreateWorkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
        </Routes>
      </main>
    </>
  )
}

export default App
