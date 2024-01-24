import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from "./components/Home/Home.js"
import "./app.css"
import Landing from './components/LandingPage/Landing.js';
import Login from './components/LandingPage/Sign_In/Login.js';
import Settings from './components/Settings/Setting.js';
import Profile from './components/Profile/Profile.js';
import Analytics from './components/Analytics/Analytics.js';


const App = () => {
    const checkTokenAndNavigate = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Show SweetAlert to inform the user to login
            Swal.fire({
                title: 'Please Login',
                text: 'You need to login to access this page.',
                icon: 'warning',
                confirmButtonText: 'Go to Login',
            });

            return false;
        }

        return true;
    };

    return (
        <>
        <Router>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='/' element={<Landing/>}/>
                <Route path='/Login' element={<Login/>}/>
                <Route path='/settings' element={<Settings/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/analytics' element={<Analytics/>}/>
            </Routes>
        </Router>
        </>
    );
}

export default App;