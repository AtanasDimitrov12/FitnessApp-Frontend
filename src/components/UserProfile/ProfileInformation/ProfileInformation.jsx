import React from 'react';
import './ProfileInformation.css';

const ProfileInformation = ({ user }) => {
  return (
    <div className="profile-information">
      <div className="header-section">
        <h2>Welcome, {user.username}</h2>
        <div className="profile-picture-wrapper">
          <img src={user.pictureURL} alt="Profile" className="profile-picture" />
          <div className="profile-picture-overlay">
          <label htmlFor="profilePicture" className="edit-label">Edit</label>
          </div>
          
        </div>
      </div>

      <div className="info-section">
        <div className="basic-info card">
          <h3>Basic info:</h3>
          <p>Weight: {user.weight}</p>
          <p>Last workout: {user.lastWorkout}</p>
          <p>Next workout: {user.nextWorkout}</p>
        </div>
        <div className="credentials card">
          <h3>Credentials:</h3>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Password: ********</p>
          <button className="edit-button">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
