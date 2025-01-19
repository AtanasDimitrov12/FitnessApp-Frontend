import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import CreateWorkoutFields from './CreateWorkoutFields';
import Preview from './Preview';
import AddExercise from './AddExercise/AddExercise';
import AddTags from './AddTags/AddTags';
import { createNewWorkout } from '../../../repositories/WorkoutRepo';
import { getExerciseById } from '../../../repositories/ExerciseRepo';
import './CreateWorkoutPage.css';

const CreateWorkoutPage = () => {
  const [workoutData, setWorkoutData] = useState({ name: '', description: '' });
  const [exerciseList, setExerciseList] = useState([]);
  const [isAddingExercises, setIsAddingExercises] = useState(false);
  const [isAddingTags, setIsAddingTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState({
    fitnessGoals: [],
    fitnessLevels: [],
    trainingStyles: [],
  });
  const [imageFile, setImageFile] = useState(null); // Separate state for image file

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };

  const handleAddExercise = () => {
    setIsAddingExercises(true);
  };

  const handleAddTags = () => {
    setIsAddingTags(true);
  };

  const handleAddPicture = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImageFile(file); // Save the file directly for later use
    } else {
      toast.error('Please upload a JPEG or PNG image.', { position: "top-right", autoClose: 3000 });
    }
  };

  const handleSaveExercises = async (exerciseIds) => {
    try {
      const fullExercises = await Promise.all(
        exerciseIds.map(async (id) => {
          const exercise = await getExerciseById(id);
          if (!exercise) {
            toast.warning(`Exercise ID ${id} not found.`, { position: "top-right", autoClose: 3000 });
          }
          return exercise;
        })
      );

      setExerciseList(fullExercises.filter(ex => ex)); // Remove any null exercises
    } catch (error) {
      console.error("Error fetching exercises:", error);
      toast.error("Error fetching exercises. Please try again.", { position: "top-right", autoClose: 4000 });
    }
    setIsAddingExercises(false);
  };

  const handleSaveTags = (tags) => {
    setSelectedTags(tags);
    setIsAddingTags(false);
  };

  const handleCreate = async () => {
    try {
      const workoutDataWithDetails = {
        ...workoutData,
        exercises: exerciseList,
        fitnessGoals: selectedTags.fitnessGoals,
        fitnessLevels: selectedTags.fitnessLevels,
        trainingStyles: selectedTags.trainingStyles,
      };

      console.log(workoutDataWithDetails);
      const createdWorkout = await createNewWorkout(workoutDataWithDetails, imageFile);

      if (createdWorkout) {
        toast.success('Workout created successfully!', { position: "top-right", autoClose: 3000 });
        console.log('Workout created successfully:', createdWorkout);

        setWorkoutData({ name: '', description: '' });
        setExerciseList([]);
        setSelectedTags({ fitnessGoals: [], fitnessLevels: [], trainingStyles: [] });
        setImageFile(null);
      } else {
        toast.error('Failed to create workout. Please try again.', { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error creating workout:', error);
      toast.error('An error occurred while creating workout. Check console for details.', { position: "top-right", autoClose: 4000 });
    }
  };

  return (
    <div className="create-workout-page">
      <ToastContainer /> {/* Ensure ToastContainer is included here */}
      
      {isAddingExercises ? (
        <AddExercise onSave={handleSaveExercises} />
      ) : isAddingTags ? (
        <AddTags onSave={handleSaveTags} />
      ) : (
        <>
          <div className="create-workout-content">
            <CreateWorkoutFields
              onAddExercise={handleAddExercise}
              onAddTags={handleAddTags}
              onAddPicture={handleAddPicture}
              onInputChange={handleInputChange}
            />
            <Preview
              workoutData={workoutData}
              exerciseList={exerciseList}
              imageFile={imageFile}
              selectedTags={selectedTags}
            />
          </div>
          <button className="create-button" onClick={handleCreate}>Create</button>
        </>
      )}
    </div>
  );
};

export default CreateWorkoutPage;
