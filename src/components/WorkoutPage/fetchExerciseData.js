import axios from 'axios';

const fetchExerciseData = async (exerciseName) => {
  try {
    const response = await axios.get(`https://exercisedb-api.vercel.app/exercises/name/${exerciseName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exercise data:', error);
    return null;
  }
};
