// Home.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar.js';
import Preloader from './Preloader/preloader.js';
import './Home.css'; // Add your stylesheets here
import Main from './Main/Main.js';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
        <Navbar/>   
        <Main/>  
        </>
        
      )}
    </div>
  );
};

export default Home;
