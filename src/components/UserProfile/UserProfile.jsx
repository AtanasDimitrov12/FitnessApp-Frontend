import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar/SideBar';
import ProfileInformation from './ProfileInformation/ProfileInformation';
import DietPreference from './DietPreference/DietPreference';
import WorkoutPreference from './WorkoutPreference/WorkoutPreference';
import ProgressNote from './ProgressNote/ProgressNote';
import { getUserById } from '../../repositories/UserRepo'; // Assuming UserRepo is in the `api` folder
import './UserProfile.css';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('profileInfo');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setError('User data not found in session');
      setLoading(false);
      return;
    }

    const { userId } = JSON.parse(storedUser);

    // Fetch user data
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-profile">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {activeSection === 'profileInfo' && user && <ProfileInformation user={user} />}
      {activeSection === 'dietPreference' && <DietPreference />}
      {activeSection === 'workoutPreference' && <WorkoutPreference />}
      {activeSection === 'progressNotes' && <ProgressNote />}
    </div>
  );
};

export default UserProfile;
