import React, { useState } from 'react';
import Sidebar from './SideBar/SideBar';
import CreateExercise from './CreateExercise/CreateExercise';
import CreateWorkout from './CreateWorkout/CreateWorkoutPage';
import CreateMeal from './CreateMeal/CreateMeal';
import './AdminCreatePage.css';

const AdminCreatePage = () => {
  const [activeSection, setActiveSection] = useState('createExercise');

  return (
    <div className="admin-create-page">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {activeSection === 'createExercise' && <CreateExercise />}
      {activeSection === 'createWorkout' && <CreateWorkout />}
      {activeSection === 'createMeal' && <CreateMeal />}
    </div>
  );
};

export default AdminCreatePage;
