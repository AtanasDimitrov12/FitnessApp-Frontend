import React, { useState } from 'react';
import { updateUser } from '../../../repositories/UserRepo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProfileInformation.css';

const ProfileInformation = ({ user }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editMode, setEditMode] = useState(''); // "username", "password", or "both"

  const handleSaveChanges = async () => {
    if (editMode === 'password' || editMode === 'both') {
      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match.');
        return;
      }
    }

    const updatedUser = {
      id: user.id,
      email: user.email,
      username: editMode !== 'password' ? username : user.username, // Update username if editing it
      password: editMode !== 'username' ? newPassword : undefined, // Update password if editing it
    };

    try {
      await updateUser(updatedUser);
      toast.success('Profile updated successfully!');
      setEditModalOpen(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="profile-information">
      <ToastContainer />
      <div className="header-section">
        <h2>Welcome, {user.username}</h2>
        <div className="profile-picture-wrapper">
          <img src={user.pictureURL} alt="Profile" className="profile-picture" />
          <div className="profile-picture-overlay">
            <label htmlFor="profilePicture" className="edit-label">Edit</label>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="basic-info card">
          <h3>Basic info:</h3>
          <p>Weight: {user.weight}</p>
          <p>Last workout: {user.lastWorkout}</p>
          <p>Next workout: {user.nextWorkout}</p>
        </div>
        <div className="credentials card">
          <h3>Credentials:</h3>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Password: ********</p>
          <button className="edit-button" onClick={() => setEditModalOpen(true)}>
            Edit
          </button>
        </div>
      </div>

      {/* Edit Details Modal */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <div className="edit-options">
              <button onClick={() => setEditMode('username')}>Edit Username</button>
              <button onClick={() => setEditMode('password')}>Edit Password</button>
              <button onClick={() => setEditMode('both')}>Edit Both</button>
            </div>

            {(editMode === 'username' || editMode === 'both') && (
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            )}

            {(editMode === 'password' || editMode === 'both') && (
              <>
                <label>
                  New Password:
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </label>
                <label>
                  Confirm Password:
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
              </>
            )}

            <div className="modal-buttons">
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={() => setEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInformation;
