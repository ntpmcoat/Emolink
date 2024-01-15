import React from "react";
import Logo from "../Home/Images/Logo.png"
import './Landing.css'
import Hero from "../Home/Images/hero.png"

const Landing = () => {
    return (
        <>

            <header>
                <div className="landing-container flex-row">
                    <div className="header__logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="right flex-center">
                        <a href="/Login" className="btn btn-secondary">Sign Up/Sign In</a>
                    </div>
                </div>
            </header>

            <section id="hero" className="container flex-row">
                <div className="hero__content">
                    <h1 className="title">EmoLink</h1>
                    <p className="text">Connect with Emotions, Share Stories, and Explore a World of Feelings. Join EmoLink to discover a community that understands.</p>
                    <a href="/Login" className="btn btn-secondary">Sign Up/Sign In</a>
                    <b>Please Sign In to Continue</b>
                </div>
                <div className="hero__img">
                    <img src={Hero} alt="hero" />
                </div>
            </section>
        </>
    )
}

export default Landing;