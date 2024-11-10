import React, { useState } from 'react';
import CreateWorkoutFields from './CreateWorkoutFields';
import Preview from './Preview';
import AddExercise from './AddExercise/AddExercise';
import { createNewWorkout } from '../../../repositories/WorkoutRepo';
import { getExerciseById } from '../../../repositories/ExerciseRepo';
import './CreateWorkoutPage.css';

const CreateWorkoutPage = () => {
  const [workoutData, setWorkoutData] = useState({ name: '', description: '' });
  const [exerciseList, setExerciseList] = useState([]);
  const [isAddingExercises, setIsAddingExercises] = useState(false);
  const [imageFile, setImageFile] = useState(null); // Separate state for image file

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };

  const handleAddExercise = () => {
    setIsAddingExercises(true);
  };

  const handleAddPicture = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImageFile(file); // Save the file directly for later use
    } else {
      alert('Please upload a JPEG or PNG image.');
    }
  };

  const handleSaveExercises = (exercises) => {
    setExerciseList(exercises);
    setIsAddingExercises(false);
  };

  const handleCreate = async () => {
    try {
      // Fetch full exercise objects for each ID in exerciseList
      const fullExercises = await Promise.all(
        exerciseList.map(async (exerciseId) => {
          const exercise = await getExerciseById(exerciseId);
          return exercise;
        })
      );

      // Update workout data with full exercise objects
      const workoutDataWithExercises = {
        ...workoutData,
        exercises: fullExercises,
      };

      console.log(workoutDataWithExercises);
      // Send data to backend using createNewWorkout function
      const createdWorkout = await createNewWorkout(workoutDataWithExercises, imageFile);
      if (createdWorkout) {
        console.log('Workout created successfully:', createdWorkout);
      } else {
        console.error('Failed to create workout.');
      }
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  return (
    <div className="create-workout-page">
      {isAddingExercises ? (
        <AddExercise onSave={handleSaveExercises} />
      ) : (
        <>
          <div className="create-workout-content">
            <CreateWorkoutFields
              onAddExercise={handleAddExercise}
              onAddPicture={handleAddPicture}
              onInputChange={handleInputChange}
            />
            <Preview workoutData={workoutData} exerciseList={exerciseList} imageFile={imageFile} />

          </div>
          <button className="create-button" onClick={handleCreate}>Create</button>
        </>
      )}
    </div>
  );
};

export default CreateWorkoutPage;
