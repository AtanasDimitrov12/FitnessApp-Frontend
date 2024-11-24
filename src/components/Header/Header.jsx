import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import "./Header.css";
import { UserContext } from "../../UserContext"; // Import UserContext

const Header = () => {
  const { user, setUser } = useContext(UserContext); // Use context for user state
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data and reset user state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Update context state
    navigate("/"); // Redirect to home page
  };

  return (
    <header>
      <div className="header-area header-transparent">
        <div className="main-header header-sticky">
          <div className="container-fluid">
            <div className="menu-wrapper d-flex align-items-center justify-content-between">
              <h1>
                <NavLink className="home" to="/">
                  Fitness App
                </NavLink>
              </h1>
              <div className="nav-menu f-right">
                <nav>
                  {user ? (
                    <>
                      {user.roles.includes("USER") && (
                        <div id="user-nav">
                          <NavLink to="/workout">Workout</NavLink>
                          <NavLink to="/diet">Diet</NavLink>
                          <NavLink to="/user-profile">User Profile</NavLink>
                        </div>
                      )}
                      {user.roles.includes("ADMIN") && (
                        <div id="admin-nav">
                          <NavLink to="/admin-create">Create</NavLink>
                        </div>
                      )}
                      <div>
                        <p onClick={handleLogout} style={{ cursor: "pointer" }}>
                          Log out
                        </p>
                      </div>
                    </>
                  ) : (
                    <div id="guest-nav">
                      <NavLink to="/">Home</NavLink>
                      <NavLink to="/register">Register</NavLink>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
