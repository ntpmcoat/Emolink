import React, { useState } from 'react';
import './Navbar.css';
import Logo from '../Images/Logo.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
  const LogOuthowAlertSuccess = () => {
    Swal.fire({
      title: 'LogOut Success',
      text: 'Please Log in Again',
      icon: 'success',
    });
  };

  const [isProfileActive, setProfileActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const username = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    LogOuthowAlertSuccess();
  };

  const handleSearch = () => {
    // Redirect to the profile page with the specified email ID
    navigate(`/profile/${searchQuery}`);
  };

  return (
    <nav>
      <div className='container'>
        <h2>EmoLink</h2>
        <div className='Searchbar'>
          <i className='uil uil-search'></i>
          <input
            type='text'
            placeholder='Search for Creators by Email ID'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className='btn btn-search' onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className='create'>
          <label className='btn btn-primary' htmlFor='create-posts'>
            Create
          </label>
          <div
            className='profile-photo'
            onMouseEnter={() => setProfileActive(true)}
            onMouseLeave={() => setProfileActive(true)}
          >
            <img src={Logo} alt='ProfilePic' />
            {isProfileActive && (
              <div className='profile-options'>
                <span className='username'>{username}</span>
                <button className='btn btn-logout' onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
