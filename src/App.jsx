import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import WorkoutPage from "./components/WorkoutPage/WorkoutPage";
import DietPage from "./components/DietPage/DietPage";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import AuthContainer from "./components/Register/AuthContainer";
import UserProfile from "./components/UserProfile/UserProfile";
import Footer from "./components/Footer/Footer";
import AdminCreatePage from "./components/AdminCreatePage/AdminCreatePage";
import NotAuthorized from "./NotAuthorized";
import PrivateRoute from "./PrivateRoute";
import AdminManagePage from "./components/AdminManagePage/AdminManagePage";
import UpdateExercise from "./components/AdminManagePage/ManageExercise/UpdateExercise/UpdateExercise";
import UpdateMeal from "./components/AdminManagePage/ManageMeals/UpdateMeal/UpdateMeal";
import UpdateWorkout from "./components/AdminManagePage/ManageWorkouts/UpdateWorkout/UpdateWorkout";
import websocketService from "./services/WebSocketService";

function App() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).userId : null;

  useEffect(() => {
    if (token && userId) {
      websocketService.connect(userId, (notification) => {
        setNotifications((prev) => [
          ...prev,
          { message: notification.message, isRead: false },
        ]);
      });
    }

    return () => {
      websocketService.disconnect();
    };
  }, [token, userId]);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  return (
    <>
      <Header
        notifications={notifications}
        setNotifications={setNotifications}
        markAllAsRead={markAllAsRead}
      />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/workout"
            element={
              <PrivateRoute roles={["USER"]}>
                <WorkoutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/diet"
            element={
              <PrivateRoute roles={["USER"]}>
                <DietPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <PrivateRoute roles={["USER"]}>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-create"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <AdminCreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-manage"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <AdminManagePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-exercise"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <UpdateExercise />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-meal"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <UpdateMeal />
              </PrivateRoute>
            }
          />

          <Route
            path="/update-workout"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <UpdateWorkout />
              </PrivateRoute>
            }
          />

          <Route path="/register" element={<AuthContainer />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
