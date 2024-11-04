import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
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
                  <div id="user-nav">
                    <NavLink to="/workouts">Workouts</NavLink>
                    <NavLink to="/user-profile">User Profile</NavLink>
                  </div>
                  <div id="trainer-nav">
                    <NavLink to="/admin-craete">Create</NavLink>
                  </div>
                  <div id="guest-nav">
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                  </div>
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
