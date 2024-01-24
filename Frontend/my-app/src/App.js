import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from "./components/Home/Home.js"
import "./app.css"
import Landing from './components/LandingPage/Landing.js';
import Login from './components/LandingPage/Sign_In/Login.js';
import Settings from './components/Settings/Setting.js';
import Profile from './components/Profile/Profile.js';
import Analytics from './components/Analytics/Analytics.js';
import Swal from 'sweetalert2';
import AppWrapper from './AnalyseWrapper.js';


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
                    <Route path='/' element={<Landing />} />
                    <Route path='/login' element={<Login />} />

                    {/* AppWrapper is present for all other pages */}
                    <Route
                        path='/*'
                        element={
                            checkTokenAndNavigate() ? (
                                <AppWrapper>
                                    <Routes>
                                        <Route path='/home' element={<Home />} />
                                        <Route path='/settings' element={<Settings />} />
                                        <Route path='/profile' element={<Profile />} />
                                        <Route path="/profile/:username" element={<Profile />} />
                                        <Route path='/analytics' element={<Analytics />} />
                                    </Routes>
                                </AppWrapper>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </Router>

        </>
    );
}

export default App;