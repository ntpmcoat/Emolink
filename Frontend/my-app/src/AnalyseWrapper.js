import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyseWrapper = ({ children }) => {
  const [activityStartTime, setActivityStartTime] = useState(null);

  useEffect(() => {
    setActivityStartTime(Date.now()); // Set initial value when component mounts

    const token = localStorage.getItem('token');
    // Extract username from the token using your logic
    const username = token;

    const handleUserActivity = () => {
      const timestamp = Date.now();
    
      // Check if activityStartTime is not null before calculating duration
      if (activityStartTime !== null) {
        const durationInSeconds = Math.floor((timestamp - activityStartTime) / 1000);
    
        axios.post('http://localhost:5000/analytics/userActivity', {
          username,
          timestamp,
          durationInSeconds,
          activityType: 'page_view',
        })
        .then(response => console.log(response.data))
        .catch(error => console.error('Error recording user activity:', error));
      }
    
      setActivityStartTime(timestamp);
    };
    const handleBeforeUnload = () => {
      handleUserActivity();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [activityStartTime]);

  return <>{children}</>;
};

export default AnalyseWrapper;
