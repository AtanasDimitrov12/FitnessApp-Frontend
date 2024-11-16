import { Route, Routes } from 'react-router-dom';
import './App.css'
import WorkoutPage from './components/WorkoutPage/WorkoutPage'
import DietPage from './components/DietPage/DietPage';
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage';
import AuthContainer from './components/Register/AuthContainer';
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
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/diet" element={<DietPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/admin-craete" element={<AdminCreatePage />} />
          <Route path="/register" element={<AuthContainer />} />
        </Routes>
      </main>

      <Footer/>
    </>
  )
}

export default App
