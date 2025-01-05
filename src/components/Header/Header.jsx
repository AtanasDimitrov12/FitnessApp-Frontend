import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import "./Header.css";
import { UserContext } from "../../UserContext"; // Import UserContext
import { FaBell } from "react-icons/fa"; // Import bell icon

const Header = ({ notifications, setNotifications }) => {
  const { user, setUser } = useContext(UserContext); // Use context for user state
  const [isModalOpen, setIsModalOpen] = useState(false); // For notifications modal
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data and reset user state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Update context state
    navigate("/"); // Redirect to home page
  };

  const unreadNotifications = notifications?.some((n) => !n.isRead);

  const toggleNotifications = () => {
    setIsModalOpen(!isModalOpen);
  };

  const markAsRead = (index) => {
    setNotifications((prev) =>
      prev.map((n, i) => (i === index ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
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
                          <div className="notifications-container">
                        <button
                          className="notification-button"
                          onClick={toggleNotifications}
                        >
                          <FaBell size={22} />
                          {unreadNotifications && <span className="red-dot"></span>}
                        </button>
                        {isModalOpen && (
                          <div className="notifications-modal">
                            <h4 className="notifications-title">Notifications</h4>
                            <ul className="notifications-list">
                              {notifications.map((notification, index) => (
                                <li
                                  key={index}
                                  className={
                                    notification.isRead ? "notification-item read" : "notification-item unread"
                                  }
                                  onClick={() => markAsRead(index)}
                                >
                                  {notification.message}
                                </li>
                              ))}
                            </ul>
                            <button
                              className="mark-all-button"
                              onClick={markAllAsRead}
                            >
                              Mark all as read
                            </button>
                          </div>
                        )}
                      </div>
                        </div>
                      )}
                      {user.roles.includes("ADMIN") && (
                        <div id="admin-nav">
                          <NavLink to="/admin-manage">Manage</NavLink>
                          <NavLink to="/admin-create">Create</NavLink>
                          <NavLink to="/admin-monitor">Monitor</NavLink>
                        </div>
                      )}
                      
                      <div>
                        <p onClick={handleLogout} className="logout-button">
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