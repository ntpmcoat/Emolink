import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from "./components/Home/Home.js"
import "./app.css"
import Landing from './components/LandingPage/Landing.js';
import Login from './components/LandingPage/Sign_In/Login.js';
import Settings from './components/Settings/Setting.js';


const App= () => {
    return(
        <>
        <Router>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='/' element={<Landing/>}/>
                <Route path='/Login' element={<Login/>}/>
                <Route path='/settings' element={<Settings/>}/>
            </Routes>
        </Router>
        </>
    );
}

export default App;