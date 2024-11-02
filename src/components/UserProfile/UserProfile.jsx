import React, { useState } from 'react';
import Sidebar from './SideBar/SideBar';
import ProfileInformation from './ProfileInformation/ProfileInformation';
import DietPreference from './DietPreference/DietPreference';
import './UserProfile.css';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('profileInfo');

  const user = {
    email: 'ap@gmail.com',
    username: 'Nakata12',
    weight: '80kg',
    lastWorkout: 'Upper body',
    nextWorkout: 'Legs',
    pictureURL: '/images/profilePic.jpg',
  };

  return (
    <div className="user-profile">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {activeSection === 'profileInfo' && <ProfileInformation user={user} />}
      {activeSection === 'dietPreference' && <DietPreference user={user} />}
      {/* Add other components here as sections when ready */}
    </div>
  );
};

export default UserProfile;
