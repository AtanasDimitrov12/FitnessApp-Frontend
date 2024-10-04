import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import WorkoutPage from './components/WorkoutPage'
import Header from './components/Header'
import HomePage from './components/HomePage';
import AllTrainers from './components/AllTrainers';

function App() {
  
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
          <Route path="/workouts/:workoutId" element={<WorkoutDetails />} />*/}
          <Route path="/trainers" element={<AllTrainers />} />
          {/*<Route path="/user-profile" element={<UserProfile />} />
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
