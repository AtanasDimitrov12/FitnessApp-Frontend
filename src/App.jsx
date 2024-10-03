import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
// import './App.css'
import WorkoutCard from './components/WorkoutCard'
import Header from './components/Header'

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
                <Route path="/" exact component={WorkoutCard} />
                    {/* <Route path="/" exact component={HomePage} />
                    <Route path="/workouts" exact component={WorkoutCatalog} />
                    <Route path="/workouts/:workoutId" component={WorkoutDetails} />
                    <Route path="/trainers" component={ListTrainers} />
                    <Route path="/user-profile" component={UserProfile} />
                    <Route path="/trainer-profile" component={TrainersProfile} />
                    <Route path="/create-workouts" component={CreateWorkout} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} /> */}
                    
                    {/* <Route path="/logout" render={(props) => {
                        console.log('Logged Out!!!');

                        return <Redirect to="/" />
                    }} /> */}
                </Routes>
        </main>
    </>
  )
}

export default App
