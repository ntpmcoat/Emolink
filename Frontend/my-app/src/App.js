import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from "./components/Home/Home.js"
import "./app.css"
import Landing from './components/LandingPage/Landing.js';

const App= () => {
    return(
        <>
        <Router>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='/' element={<Landing/>}/>
            </Routes>
        </Router>
        </>
    );
}

export default App;