// Settings.js

import React from 'react';
import './Setting.css';
import { useNavigate } from 'react-router-dom';
import { forgotPass } from '../../api';
import Swal from 'sweetalert2';


const Settings = () => {
  const navigate = useNavigate();
  const LogOuthowAlertSuccess = () => {
    Swal.fire({
      title: 'LogOut Success',
      text: 'Please Log in Again',
      icon: 'success',
    });
}


  const handleProfileSettings = () => {
    console.log('Profile settings updated');
  };

  const handleChangePassword=()=>{


    const forgotShowAlertSuccess = () => {
      Swal.fire({
        title: 'Email Send',
        text: 'Please click on the link sent to you email to change password',
        icon: 'Success',
      });
  }
    const forgotShowAlertFail = () => {
      Swal.fire({
        title: 'Server Busy',
        text: 'Please Try again later',
        icon: 'error',
      });
  }
    try {
      const response=forgotPass();
      forgotShowAlertSuccess()

      console.log(response);
    } catch (error) {
      forgotShowAlertFail();
      console.log(error);
    }
  }

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
    LogOuthowAlertSuccess();
  }


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
       

          <button type="button" onClick={handleChangePassword} className='btn btn-primary'>Change Password</button>
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
