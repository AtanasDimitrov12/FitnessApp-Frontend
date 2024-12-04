import React, { useState } from "react";
import { updateUser, uploadProfilePicture } from "../../../repositories/UserRepo"; // Import the new uploadProfilePicture method
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfileInformation.css";

const ProfileInformation = ({ user }) => {
  const defaultPicURL = "https://res-console.cloudinary.com/dgovaqahy/thumbnails/v1/image/upload/v1733316054/cHJvZmlsZV9samhudWQ=/drilldown";
  const [userData, setUserData] = useState(user);
  const [previewURL, setPreviewURL] = useState(user.pictureURL ?? defaultPicURL); // Use default URL if pictureURL is null

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewURL(URL.createObjectURL(file)); // Show the preview immediately
      try {
        // Call backend to upload the image
        const uploadResponse = await uploadProfilePicture(user.id, file); // Call the backend API
        setUserData({ ...userData, pictureURL: uploadResponse.pictureURL }); // Update userData with the new picture URL
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        toast.error("Failed to upload profile picture. Please try again.");
        console.error("Image upload error:", error);
        setPreviewURL(user.pictureURL ?? defaultPicURL); // Revert to previous or default picture if upload fails
      }
    }
  };

  return (
    <div className="profile-information">
      <ToastContainer />
      <div className="header-section">
        <h2>Welcome, {userData.username}</h2>
        <div className="profile-picture-wrapper">
          <img src={previewURL} alt="Profile" className="profile-picture" />
          <div className="profile-picture-overlay">
            <label className="upload-label">
              Upload Picture
              <input
                type="file"
                id="fileInput"
                className="hidden-file-input"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
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
          <p>Username: {userData.username}</p>
          <p>Password: ********</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
