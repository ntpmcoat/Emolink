import React from 'react';
import './Profile.css';
import '../Home/Main/Main.css'
import Navbar from '../Home/Navbar/Navbar.js';

const followers = 0;
const following = 0;
const posts = 0;

const Profile = () => {
    return (
        <div >
            <Navbar />
            <div className='container'>
                <div className='profile'>
                    <div className='profile-left'>
                    </div>
                    <div className='profile-right'>
                        <div className='profile-top'>
                            <div className='cover'>
                                <img className='cover-image' src='./images/cover.jpg' />
                                {/* user image */}
                                <img className='user-image' src='logo192.png' />
                                <button className='edit-button'> edit </button>
                            </div>
                            <div className='profile-info'>
                                <div>
                                    <h4 className='user-name'>ntpm@coat002</h4>
                                    <span className='Original-name'>Nikhil Mishra</span>
                                </div>
                                <div className='numbers'>
                                    <a href='' className='num'>
                                        <div>{followers}</div>
                                        <div>followers</div>
                                    </a>
                                    <a className='num'>
                                        <div>{following}</div>
                                        <div>following</div>
                                    </a>
                                    <a className='num'>
                                        <div>{posts}</div>
                                        <div>posts</div>
                                    </a>
                                </div>
                                <hr />
                            </div>
                        </div>

                        <div className='profile-bottom'>
                            <div className='left-about'>
                                <ul>
                                    <li className='uil uil-home'> {'\u00A0\u00A0'} Male </li>
                                    <li className='uil uil-home'> {'\u00A0\u00A0'} Born : 17 Feb, 2004 </li>
                                    <li className='uil uil-home'> {'\u00A0\u00A0'} navi mumbai </li>
                                    <li className='uil uil-home'> {'\u00A0\u00A0'} abc@xyz.gmail.com </li>
                                    <li className='uil uil-home'> {'\u00A0\u00A0'} 9769436384 </li>
                                </ul>
                            </div>
                            <div className='center-pages'>
                                {/* bhai yaha pe main jaisa message ka copy paste */}
                                <div className='following active'>
                                        <h6 className='head'>following</h6>
                                </div>
                                <div className='followers'>
                                <h6 className='head'>followers</h6>
                                </div>
                                <div className='posts'>
                                <h6 className='head'>post</h6>
                                    {/* yaha pe hum posts dalenge jo jo usne kiya hoga */}
                                </div>

                            </div>
                            <div className='right-suggestions'>
                                <div className='tab might'>
                                    <h5 className='rh'> You might known</h5>
                                </div>
                                <div className='tab recent'>
                                    <h5 className='rh'> Recent</h5>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default Profile;

