import React, { useState } from "react";
import "./UserProfile.css"; // External CSS for UserProfile styling

const UserProfile = () => {
  // State to track which section is currently selected
  const [activeSection, setActiveSection] = useState("updateInfo");

  // Dummy state for the user's data and progress entries
  const [user, setUser] = useState({
    username: "user123",
    email: "user@example.com",
    age: 25,
    pictureURL: "/images/user.png",
  });

  const [progress, setProgress] = useState([
    { date: "2024-01-01", weight: "75kg", sleepRating: "7/10", progressImage: "/images/user-progress.png" },
    { date: "2024-01-08", weight: "74kg", sleepRating: "8/10", progressImage: "/images/user-progress2.png" },
  ]);

  // Sub-navigation options
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Render different sections based on the selected navigation option
  return (
    <div className="user-profile-page">
      <h1 className="page-title">User Profile</h1>

      {/* Sub-navigation */}
      <div className="profile-nav">
        <button
          className={activeSection === "updateInfo" ? "active" : ""}
          onClick={() => handleSectionChange("updateInfo")}
        >
          Update Info
        </button>
        <button
          className={activeSection === "uploadResume" ? "active" : ""}
          onClick={() => handleSectionChange("uploadResume")}
        >
          Upload Weekly Resume
        </button>
        <button
          className={activeSection === "improvementTrack" ? "active" : ""}
          onClick={() => handleSectionChange("improvementTrack")}
        >
          Improvement Track
        </button>
      </div>

      {/* Render the selected section */}
      {activeSection === "updateInfo" && (
        <section className="update-info-section">
          <h2>Update Personal Information</h2>
          {/* Form for updating user info */}
          <form className="personal-info-form">
            {/* Fields for updating info like in previous example */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" value={user.username} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={user.email} required />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" value={user.age} required />
            </div>
            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture</label>
              <input type="file" id="profilePicture" accept="image/*" />
              {user.pictureURL && <img src={user.pictureURL} alt="Profile" className="profile-picture" />}
            </div>
            <button type="submit" className="update-profile-button">Update Info</button>
          </form>
        </section>
      )}

      {activeSection === "uploadResume" && (
        <section className="upload-resume-section">
          <h2>Upload Weekly Resume</h2>
          {/* Form for uploading progress like weight, sleep rating, picture */}
          <form className="progress-form">
            <div className="form-group">
              <label htmlFor="weight">Body Weight (kg)</label>
              <input type="number" id="weight" name="weight" required />
            </div>
            <div className="form-group">
              <label htmlFor="sleepRating">Sleep Rating (1-10)</label>
              <input type="number" id="sleepRating" name="sleepRating" required />
            </div>
            <div className="form-group">
              <label htmlFor="progressImage">Progress Picture</label>
              <input type="file" id="progressImage" accept="image/*" />
            </div>
            <button type="submit" className="track-progress-button">Submit Resume</button>
          </form>
        </section>
      )}

      {activeSection === "improvementTrack" && (
        <section className="improvement-track-section">
          <h2>Improvement Track</h2>
          {/* Display progress entries */}
          <div className="progress-entries">
            {progress.map((entry, index) => (
              <div key={index} className="progress-entry">
                <p>Date: {entry.date}</p>
                <p>Weight: {entry.weight}</p>
                <p>Sleep Rating: {entry.sleepRating}</p>
                {entry.progressImage && (
                  <img src={entry.progressImage} alt="Progress" className="progress-image" />
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default UserProfile;
