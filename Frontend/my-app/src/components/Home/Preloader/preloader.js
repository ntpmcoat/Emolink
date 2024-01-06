import React from 'react';
import "./preloader.css"; // Add your stylesheets for the logo preloader here

import Logo from "../Images/Logo.png"

const LogoPreloader = () => {
  return (
    <div className="logo-preloader">
      <div className="logo-container">
        {/* Add your logo image here */}
        <img src={Logo} alt="EmoLink Logo" />
      </div>
      <div className="loading-text">
        <h1>Loading...</h1>
      </div>
    </div>
  );
};

export default LogoPreloader;
