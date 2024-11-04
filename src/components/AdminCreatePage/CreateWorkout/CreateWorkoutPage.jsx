import React, { useState } from 'react';
import CreateWorkoutFields from './CreateWorkoutFields';
import Preview from './Preview';
import AddExercise from './AddExercise/AddExercise';
import './CreateWorkoutPage.css'; 

const CreateWorkoutPage = () => {
  const [workoutData, setWorkoutData] = useState({ name: '', description: '', picture: '' });
  const [exerciseList, setExerciseList] = useState([]);
  const [isAddingExercises, setIsAddingExercises] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };

  const handleAddExercise = () => {
    setIsAddingExercises(true); // Show AddExercise component
  };

  const handleAddPicture = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWorkoutData({ ...workoutData, picture: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a JPEG or PNG image.');
    }
  };

  const handleSaveExercises = (exercises) => {
    setExerciseList(exercises); // Update the exercise list
    setIsAddingExercises(false); // Close the AddExercise view
  };

  const handleCreate = () => {
    console.log('Workout created:', workoutData, exerciseList);
    // Further logic to save workout details
  };

  return (
    <div className="create-workout-page">
      {isAddingExercises ? (
        <AddExercise onSave={handleSaveExercises} /> // Show AddExercise component
      ) : (
        <>
          <div className="create-workout-content">
            <CreateWorkoutFields
              onAddExercise={handleAddExercise}
              onAddPicture={handleAddPicture}
              onInputChange={handleInputChange}
            />
            <Preview workoutData={workoutData} exerciseList={exerciseList} />
          </div>
          <button className="create-button" onClick={handleCreate}>Create</button>
        </>
      )}
    </div>
  );
};

export default CreateWorkoutPage;
