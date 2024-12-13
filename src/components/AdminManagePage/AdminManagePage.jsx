import React, { useState } from 'react';
import Sidebar from './SideBar/SideBar';
import ManageExercise from './ManageExercise/ManageExercise';
import './AdminManagePage.css'; // Ensure this file contains the updated CSS
import ManageMeal from './ManageMeals/ManageMeal';
import ManageWorkouts from './ManageWorkouts/ManageWorkouts';

const AdminManagePage = () => {
  const [activeSection, setActiveSection] = useState('manageExercise');

  return (
    <div className="admin-manage-page">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="admin-manage-content">
        {activeSection === 'manageExercise' && <ManageExercise />}
        {activeSection === 'manageWorkouts' && <ManageWorkouts />}
        {activeSection === 'manageMeals' && <ManageMeal />}
        {/* Add more sections if needed */}
      </div>
    </div>
  );
};

export default AdminManagePage;
