import React from "react";
import "./TrainerCard.css"; // External CSS for TrainerCard styling

const TrainerCard = ({ trainer }) => {
  return (
    <div className="trainer-card">
      <img src={trainer.profileImage} alt={`${trainer.firstName} ${trainer.lastName}`} />
      <h2>{trainer.firstName} {trainer.lastName}</h2>
      <p>{trainer.expertise}</p>
      <p>Age: {trainer.age}</p>
      <p>{trainer.gender}</p>
      <p>Email: {trainer.email}</p>
    </div>
  );
};

export default TrainerCard;