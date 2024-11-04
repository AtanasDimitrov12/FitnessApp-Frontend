import { Route, Routes } from 'react-router-dom';
import './App.css'
import WorkoutPage from './components/UserWorkoutPlan/WorkoutPage'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';
import Footer from './components/Footer/Footer';
import AdminCreatePage from './components/AdminCreatePage/AdminCreatePage';


function App() {
  
  return (
    <>
      <Header />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workouts" element={<WorkoutPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/admin-craete" element={<AdminCreatePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </main>

      <Footer/>
    </>
  )
}

export default App
