// Settings.js

import React from 'react';
import './Setting.css';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  const handleProfileSettings = () => {
    console.log('Profile settings updated');
  };

  const handleChangePassword = () => {
    console.log('Password changed');
  };

  const handleLogout = () => {
    console.log('Logged out');
    navigate('/login');
  };

  const handleDeactivateAccount = () => {
    console.log('Account deactivated');
  };

  const handleDeleteAccount = () => {
    console.log('Account deleted');
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>

      {/* Profile Settings Form */}
      <div className="profile-settings-form">
        <h3>Edit Profile</h3>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="bio">Bio:</label>
          <textarea id="bio" name="bio" rows="4"></textarea>

          <button type="button" onClick={handleProfileSettings} className='btn btn-primary'>Save Changes</button>
        </form>
      </div>

      {/* Change Password */}
      <div className="change-password">
        <h3>Change Password</h3>
        <form>
          <label htmlFor="current-password">Current Password:</label>
          <input type="password" id="current-password" name="current-password" />

          <label htmlFor="new-password">New Password:</label>
          <input type="password" id="new-password" name="new-password" />

          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" name="confirm-password" />

          <button type="button" onClick={handleChangePassword} className='btn btn-primary'>Change Password</button>
        </form>
      </div>

      {/* Account Actions */}
      <div className="account-actions">
        <h3>Account Actions</h3>
        <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
        <button onClick={handleDeactivateAccount} className='btn btn-danger'>Deactivate Account</button>
        <button onClick={handleDeleteAccount} className='btn btn-danger'>Delete Account</button>
      </div>
    </div>
  );
};

export default Settings;
