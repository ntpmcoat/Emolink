// Navbar.js
import React from 'react';
import './Navbar.css'
import Logo from "../Images/Logo.png"


const Navbar = () => {
  return (
    <nav>
      <div className='container'>
        <h2>EmoLink</h2>
        <div className='Searchbar'>
          <i className="uil uil-search"></i>
          <input type='search' placeholder='Search for Creators'/>
        </div>
        <div className='create'>
          <label className='btn btn-primary' htmlFor='create-posts'>Create</label>
          <div className='profile-photo'>
            <img src={Logo} alt='ProfilePic'/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
