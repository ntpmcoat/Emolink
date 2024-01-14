
import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsPeopleFill, BsFillTrophyFill, BsFillBellFill } from 'react-icons/bs';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import Header from '../Home/Navbar/Navbar.js';
import { fetchUserActivityDuration } from '../../api/index.js';
import './Analytics.css';

const formatDuration = (value) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  return `${hours} hours ${minutes} minutes`;
};

const Analytics = () => {
  const [userActivityDuration, setUserActivityDuration] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('token');
    const username = email; // Replace with actual username
    const fetchUserActivityData = async () => {
      try {
        const activityDuration = await fetchUserActivityDuration(username);
        setUserActivityDuration(activityDuration);
      } catch (error) {
        console.error('Error fetching user activity duration:', error);
      }
    };

    fetchUserActivityData();
  }, []);

  return (
    <div>
      <Header className='header' />
      <div className='container'>
        <div className='analytics-grid-container'>
          <main className='analytics-main-container'>
          <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>No. of Posts</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Reward Points</h3>
                    <BsFillTrophyFill className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>No. of Friend Requests</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Notifications</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>42</h1>
            </div>
            </div>

            <div className='charts'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={400}
                  height={400}
                  data={userActivityDuration}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="activityTimestamp" />
                  <YAxis dataKey="durationInSeconds" />
                  <Tooltip
                    formatter={(value) => formatDuration(value)}
                  />
                  <Legend />
                  <Bar dataKey="durationInSeconds" fill="rgb(155, 208, 7)" />
                </BarChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={userActivityDuration}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="10 10" />
                  <XAxis dataKey="activityTimestamp" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => formatDuration(value)}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="durationInSeconds"
                    stroke="rgb(155, 208, 7)"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
