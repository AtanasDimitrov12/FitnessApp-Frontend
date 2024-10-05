import React from "react";
import TrainerCard from "../TrainerCard/TrainerCard";
import "./AllTrainers.css"; // External CSS for AllTrainers page styling

// Fake trainers array with placeholders
const trainers = [
  {
    firstName: "John",
    lastName: "Doe",
    username: "johntrainer",
    email: "john@example.com",
    age: 32,
    gender: "Male",
    expertise: "Strength Training",
    profileImage: "/images/trainer.png", // Use trainer.png for all
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    username: "janetrainer",
    email: "jane@example.com",
    age: 28,
    gender: "Female",
    expertise: "Cardio and Endurance",
    profileImage: "/images/trainer.png", // Use trainer.png for all
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    username: "mikejohnson",
    email: "michael@example.com",
    age: 35,
    gender: "Male",
    expertise: "CrossFit",
    profileImage: "/images/trainer.png",
  },
  {
    firstName: "Sarah",
    lastName: "Williams",
    username: "sarahw",
    email: "sarah@example.com",
    age: 30,
    gender: "Female",
    expertise: "Yoga and Flexibility",
    profileImage: "/images/trainer.png",
  },
  {
    firstName: "Chris",
    lastName: "Brown",
    username: "chrisb",
    email: "chris@example.com",
    age: 40,
    gender: "Male",
    expertise: "Weightlifting",
    profileImage: "/images/trainer.png",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    username: "emilyd",
    email: "emily@example.com",
    age: 25,
    gender: "Female",
    expertise: "HIIT",
    profileImage: "/images/trainer.png",
  },
  {
    firstName: "Daniel",
    lastName: "Martinez",
    username: "danielm",
    email: "daniel@example.com",
    age: 29,
    gender: "Male",
    expertise: "Endurance Training",
    profileImage: "/images/trainer.png",
  },
  {
    firstName: "Sophia",
    lastName: "Taylor",
    username: "sophiat",
    email: "sophia@example.com",
    age: 27,
    gender: "Female",
    expertise: "Strength and Conditioning",
    profileImage: "/images/trainer.png",
  },
  {
    firstName: "Alex",
    lastName: "Hernandez",
    username: "alexh",
    email: "alex@example.com",
    age: 34,
    gender: "Male",
    expertise: "Bodybuilding",
    profileImage: "/images/trainer.png",
  },
  {
    firstName: "Laura",
    lastName: "White",
    username: "laurawhite",
    email: "laura@example.com",
    age: 26,
    gender: "Female",
    expertise: "Pilates",
    profileImage: "/images/trainer.png",
  },
];

const AllTrainers = () => {
  return (
    <div className="all-trainers-page">
      <h1 className="page-title">Our Trainers</h1>
      <div className="trainer-list">
        {trainers.map((trainer, index) => (
          <TrainerCard key={index} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;
