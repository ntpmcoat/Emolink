import React from 'react'
import './Analytics.css'
import { BsFillArchiveFill, BsPeopleFill, BsFillTrophyFill, BsFillBellFill} from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';


import Header from '../Home/Navbar/Navbar.js';

const Analytics = () =>  {

  const data = [
    {
      name: 'Page A',
      st: 4000,
    },
    {
      name: 'Page B',
      st :500,
    },
    {
      name: 'Page C',
      st : 5000
    },
    {
      name: 'Page D',
      st : 3000
    },
    
  ];
 
  return (
    <div>
      <Header className='header' />
    <div className='container'>
    <div className='analytics-grid-container'>
{/*       sidebar */}
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
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis dataKey="st" />
                <Tooltip />
                <Legend />
                <Bar dataKey="st" fill="rgb(155, 208, 7)" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="st" stroke="rgb(155, 208, 7)" activeDot={{ r: 8 }} />
                
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
    </div>
    </div>
    </div>
  )
}

export default Analytics;

