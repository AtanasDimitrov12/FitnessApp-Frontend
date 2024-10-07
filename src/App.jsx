import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import WorkoutPage from './components/WorkoutPage/WorkoutPage'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage';
import AllTrainers from './components/AllTrainers/AllTrainers';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateWorkout from './components/WorkoutPage/CreateWorkout';
import TrainerProfile from './components/TrainerCard/TrainerProfile';
import UserProfile from './components/UserProfile/UserProfile';


function App() {
  
  return (
    <>
      <Header />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workouts" element={<WorkoutPage />} />
          <Route path="/trainers" element={<AllTrainers />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/trainer-profile" element={<TrainerProfile />} />
          <Route path="/create-workouts" element={<CreateWorkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </main>
    </>
  )
}

export default App
