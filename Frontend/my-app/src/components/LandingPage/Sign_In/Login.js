import React,{useEffect,useState} from "react";

import "./Login.css"; // Import your CSS file
import LoginFunction from "./Function.js";
import { registerUser,loginUser } from "../../../api/index.js";
import './Login.css';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    useEffect(()=>{
        LoginFunction();
    },[]);
    const navigate=useNavigate();

    const regShowAlertSuccess = () => {
        Swal.fire({
          title: 'Registration Success',
          text: 'Please Veify Email on your mail To continue',
          icon: 'success',
        });
    }

    const regShowAlertFail = () => {
        Swal.fire({
          title: 'Registration Fail',
          text: 'Please Try again later',
          icon: 'error',
        });
    }

    const LogShowAlertSuccess = () => {
        Swal.fire({
          title: 'Login Success',
          text: 'Please Enjoy',
          icon: 'success',
        });
    }

    const LogShowAlertFail = () => {
        Swal.fire({
          title: 'Login Fail',
          text: 'Please Try again later',
          icon: 'error',
        });
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });


    const handleSignUp = async(e) => {
        e.preventDefault();
        try {
            const user = await registerUser(formData);
            regShowAlertSuccess();
            window.location.reload();
      
          } catch (error) {
            regShowAlertFail();
           console.log("Registration error");
          }
      };
    
      const handleSignIn = async(e) => {
        e.preventDefault();
        try {
           
      
            const user = await loginUser(formData);
            navigate('/home');
            LogShowAlertSuccess();
            
            

            
          } catch (error) {
            console.log("Login Error");
            LogShowAlertFail();
          }
      }

          const handleInputChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
            };
    
  return (
    <div className="form-body">
    <div className="forms-container" id="forms-container" >
    <div className="form-container sign-up">
        <form>
            <h1>Create Account</h1>
            <div className="social-icons">
                <a href="#" className="icon"><i className="uil uil-google"></i></a>
                <a href="#" className="icon"><i className="uil uil-github"></i></a>
                <a href="#" className="icon"><i className="uil uil-linkedin"></i></a>
            </div>
            <span>or use your email for registeration</span>
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange}/>
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange}/>
            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange}/>
            <button onClick={handleSignUp}>Sign Up</button>
        </form>
    </div>
    <div className="form-container sign-in">
        <form>
            <h1>Sign In</h1>
            <div className="social-icons">
            <a href="#" className="icon"><i className="uil uil-google"></i></a>
                <a href="#" className="icon"><i className="uil uil-github"></i></a>
                <a href="#" className="icon"><i className="uil uil-linkedin"></i></a>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange}/>
            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange}/>
            <a href="/settings">Forget Your Password?</a>
            <button onClick={handleSignIn}>Sign In</button>
        </form>
    </div>
    <div className="toggle-container">
        <div className="toggle">
            <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button className="hidden" id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>Register with your personal details to use all of site features</p>
                <button className="hidden" id="register">Sign Up</button>
            </div>
        </div>
    </div>
</div>
</div>
  );
}

export default Login;