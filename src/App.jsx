import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <Header />

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
          <Route path="/register" element={<AuthContainer />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
