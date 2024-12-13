import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate'; // Import React Paginate
import { useNavigate } from 'react-router-dom';
import WorkoutCard from './WorkoutCard/WorkoutCard'; // Use WorkoutCard
import { getWorkouts, deleteWorkout } from '../../../repositories/WorkoutRepo'; // Workout repository methods
import './ManageWorkouts.css'; // Custom CSS

const ManageWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const workoutsPerPage = 12; // Display 12 workouts per page
  const navigate = useNavigate();

  // Fetch all workouts on component mount
  useEffect(() => {
    const fetchWorkouts = async () => {
      const fetchedWorkouts = await getWorkouts();
      if (fetchedWorkouts) {
        setWorkouts(fetchedWorkouts.reverse());
      } else {
        console.error('Failed to fetch workouts.');
      }
    };

    fetchWorkouts();
  }, []);

  // Calculate pagination logic
  const offset = currentPage * workoutsPerPage;
  const currentWorkouts = workouts.slice(offset, offset + workoutsPerPage);
  const pageCount = Math.ceil(workouts.length / workoutsPerPage);

  // Handle delete
  const handleDelete = async (id) => {
    const isDeleted = await deleteWorkout(id);
    if (isDeleted) {
      setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.id !== id));
    } else {
      console.error('Failed to delete workout.');
    }
  };

  // Handle edit
  const handleEdit = (workout) => {
    navigate('/update-workout', { state: { workout } }); // Redirect to the UpdateWorkout page with the selected workout
  };

  // Handle page click
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="manage-workout-page">
      <div className="manage-workout-content">
        <h2 className="page-title">Manage Workouts</h2>
        <div className="manage-workout-list">
          {currentWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id} // Add a unique key for each card
              workoutData={{
                name: workout.name,
                description: workout.description,
              }}
              exerciseList={workout.exercises || []}
              imageURL={workout.pictureURL || ''}
              onEdit={() => handleEdit(workout)} // Pass the workout to handleEdit
              onDelete={() => handleDelete(workout.id)} // Pass Delete handler
            />
          ))}
        </div>
        <ReactPaginate
          previousLabel="← Previous"
          nextLabel="Next →"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination-container"
          pageClassName="pagination-page"
          activeClassName="pagination-active"
          previousClassName="pagination-previous"
          nextClassName="pagination-next"
          disabledClassName="pagination-disabled"
        />
      </div>
    </div>
  );
};

export default ManageWorkouts;
