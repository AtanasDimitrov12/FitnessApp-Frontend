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
                    <NavLink to="/workout">Workout</NavLink>
                    <NavLink to="/diet">Diet</NavLink>
                    <NavLink to="/user-profile">User Profile</NavLink>
                  </div>
                  <div id="admin-nav">
                    <NavLink to="/admin-craete">Create</NavLink>
                  </div>
                  <div id="guest-nav">
                    <NavLink to="/register">Register</NavLink>
                  </div>
                  <div>
                    <p>Log out</p>
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
