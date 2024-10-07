import React, { useState } from "react";
import "./TrainerProfile.css"; 

const TrainerProfile = () => {
  
  const [trainer, setTrainer] = useState({
    username: "trainer123",
    email: "trainer@example.com",
    age: 30,
    gender: "Male",
    expertise: "Strength Training",
    pictureURL: "/images/trainer.png",
  });

  const [newProfilePicture, setNewProfilePicture] = useState(null); 

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainer({ ...trainer, [name]: value });
  };

  
  const handlePictureChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", trainer.username);
    formData.append("email", trainer.email);
    formData.append("age", trainer.age);
    formData.append("gender", trainer.gender);
    formData.append("expertise", trainer.expertise);

    if (newProfilePicture) {
      formData.append("profilePicture", newProfilePicture); 
    }

    
    fetch("/api/trainers/updateProfile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        
        console.log("Profile updated successfully", data);
        if (data.pictureURL) {
          setTrainer({ ...trainer, pictureURL: data.pictureURL });
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="trainer-profile-page">
      <h1 className="page-title">Update Trainer Profile</h1>
      <form className="trainer-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={trainer.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={trainer.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={trainer.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={trainer.gender}
            onChange={handleChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="expertise">Expertise</label>
          <input
            type="text"
            id="expertise"
            name="expertise"
            value={trainer.expertise}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handlePictureChange}
          />
          {trainer.pictureURL && (
            <div className="current-picture">
              <img
                src={trainer.pictureURL}
                alt="Trainer Profile"
                className="profile-picture"
              />
            </div>
          )}
        </div>

        <button type="submit" className="update-profile-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default TrainerProfile;
