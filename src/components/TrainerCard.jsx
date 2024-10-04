import React from "react";
import "./TrainerCard.css"; // External CSS for TrainerCard styling

const TrainerCard = ({ trainer }) => {
  const { firstName, lastName, username, email, age, gender, expertise, profileImage } = trainer;

  return (
    <div className="trainer-card">
      {/* Profile image */}
      <img
        className="trainer-profile-image"
        src={profileImage}
        alt={`${firstName} ${lastName}'s profile`}
      />
      <h2 className="trainer-name">
        {firstName} {lastName}
      </h2>
      <p className="trainer-username">@{username}</p>
      <p className="trainer-email">{email}</p>
      <p className="trainer-age-gender">
        {age} years old, {gender}
      </p>
      <p className="trainer-expertise">
        Expertise: {expertise}
      </p>
      {/* Details button */}
      <button className="details-button">View Profile</button>
    </div>
  );
};

export default TrainerCard;
