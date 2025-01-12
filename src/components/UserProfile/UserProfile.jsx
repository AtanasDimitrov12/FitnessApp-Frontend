import React, { useState, useEffect } from 'react';
import UserSideBar from './UserSideBar/UserSideBar';
import ProfileInformation from './ProfileInformation/ProfileInformation';
import DietPreference from './DietPreference/DietPreference';
import WorkoutPreference from './WorkoutPreference/WorkoutPreference';
import ProgressNote from './ProgressNote/ProgressNote';
import { getUserById } from '../../repositories/UserRepo'; // Adjust path if necessary
import './UserProfile.css';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('profileInfo');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        setError('User data not found in session');
        setLoading(false);
        return;
      }

      try {
        const { userId } = JSON.parse(storedUser);
        const fetchedUser = await getUserById(userId);

        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Render active section
  const renderSection = () => {
    if (!user) {
      return <p>Loading user data...</p>;
    }

    switch (activeSection) {
      case 'profileInfo':
        return <ProfileInformation user={user} />;
      case 'dietPreference':
        return <DietPreference userId={user.id} />;
      case 'workoutPreference':
        return <WorkoutPreference userId={user.id} />;
      case 'progressNotes':
        return <ProgressNote userId={user.id} />;
      default:
        return <p>Select a section to view</p>;
    }
  };


  if (loading) {
    return <div className="loading">Loading user profile...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="user-profile">
      <UserSideBar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="section-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default UserProfile;
