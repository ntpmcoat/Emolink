import React,{useEffect} from "react";
import "./Login.css"; // Import your CSS file
import LoginFunction from "./Function.js";
import './Login.css';

const Login = () => {
    useEffect(()=>{
        LoginFunction();
    },[]);
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
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button>Sign Up</button>
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
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <a href="#">Forget Your Password?</a>
            <button>Sign In</button>
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