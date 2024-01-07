import React, { useEffect } from "react";
import './Main.css'
import Logo from "../Images/Logo.png"

import myFunction from "./Function.js"


const Main = () =>{
    useEffect(()=>{
        myFunction();
    },[]);
    return(
        <>
        <main>
            <div className="container">
                <div className="left">
                    <a className="profile">
                        <div className="profile-photo">
                            <img src={Logo} alt="Profiles"/>
                        </div>
                        <div className="handle">
                            <h4>Jaikishen</h4>
                            <p className="text-muted">@jai</p>
                        </div>
                    </a>
                <div className="sidebar">
                    <a className="menu-item active">
                        <span><i className="uil uil-home"></i></span><h3>Home</h3>
                    </a>
                    <a className="menu-item">
                        <span><i className="uil uil-compass"></i></span><h3>Explore</h3>
                    </a>
                    <a className="menu-item" id="notifications">
                        <span><i className="uil uil-bell    "><small className="notification-count">9+</small></i></span><h3>Notifications</h3>
                        <div className="notifications-popup">
                            <div>
                                <div className="profile-photo">
                                    <img src={Logo} alt="Profile"/>
                                </div>
                                <div className="notification-body">
                                    <b>Nikhil Mishra</b> accepted your friend request
                                    <small className="text-muted"> 2 Days Ago</small>
                                </div>
                            </div>
                            <div>
                                <div className="profile-photo">
                                    <img src={Logo} alt="Profile"/>
                                </div>
                                <div className="notification-body">
                                    <b>Jammy Khan</b> send you friend request
                                    <small className="text-muted"> 2 Days Ago</small>
                                </div>
                            </div>
                            <div>
                                <div className="profile-photo">
                                    <img src={Logo} alt="Profile"/>
                                </div>
                                <div className="notification-body">
                                    <b>Sharjeel Ansari</b> commented on your post
                                    <small className="text-muted"> 4 hours Ago</small>
                                </div> 
                            </div>
                        </div>
                    </a>
                    <a className="menu-item" id="messages-notifications">
                        <span><i className="uil uil-message"><small className="notification-count">6</small></i></span><h3>Messages</h3>
                    </a>
                    <a className="menu-item">
                        <span><i className="uil uil-bookmark"></i></span><h3>Bookmarks</h3>
                    </a>
                    <a className="menu-item">
                        <span><i className="uil uil-analytics"></i></span><h3>Analytics</h3>
                    </a>
                    <a className="menu-item" id="theme">
                        <span><i className="uil uil-palette"></i></span><h3>Theme</h3>
                    </a>
                    <a className="menu-item active">
                        <span><i className="uil uil-cog"></i></span><h3>Settings</h3>
                    </a>
                </div>
                <label htmlFor="create-post" className="btn btn-primary">Create Post</label>
                </div>
                <div className="center">
                    <div className="stories">
                        <div className="story">
                            <div className="profile-photo">
                                <img src={Logo} alt="Post"/>
                            </div>
                            <p className="name">Jaikishen Mishra</p>
                        </div>
                        <div className="story">
                            <div className="profile-photo">
                                <img src={Logo} alt="Post"/>
                            </div>
                            <p className="name">Nikhil Mishra</p>
                        </div>
                        <div className="story">
                            <div className="profile-photo">
                                <img src={Logo} alt="Post"/>
                            </div>
                            <p className="name">Jammy Mishra</p>
                        </div>
                        <div className="story">
                            <div className="profile-photo">
                                <img src={Logo} alt="Post"/>
                            </div>
                            <p className="name">Sharjeel Mishra</p>
                        </div>
                    </div>
                    <form action="" className="create-post">
                        <div className="profile-photo">
                            <img src={Logo} alt="Post-Pic"/>
                        </div>
                        <input type="text" placeholder="What's on your mind?" id="create-post"/>
                        <input type="submit" value="Post" className="btn btn-primary"/>
                    </form>
                    <div className="feeds">
                        <div className="feed">
                            <div className="head">
                                <div className="user">
                                    <div className="profile-photo">
                                        <img src={Logo} alt="Profile"/>
                                    </div>
                                    <div className="info">
                                        <h3>Roshan Yadav</h3>
                                        <small>Bihar,10 minutes ago</small>
                                    </div>
                                </div>
                                <span className="edit">
                                    <i className="uil uil-ellipsis-h"></i>
                                </span>
                            </div>


                            <div className="photo">
                                <img src={Logo} alt="Profile"/>
                            </div>

                            <div className="action-buttons">
                                <div className="interaction-buttons">
                                <span><i className="uil uil-thumbs-up"></i></span>
                                <span><i className="uil uil-comment"></i></span>
                                <span><i className="uil uil-share"></i></span>
                                </div>
                                <div className="bookmarks">
                                    <span><i className="uil uil-bookmark-full"></i></span>
                                </div>
                            </div>
                            <div className="liked-by">
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <p>Liked by<b>kalyani </b> and <b> and 2000 others </b></p>
                            </div>
                            <div className="caption">
                                <p><b>Roshan </b>So close yet so far.
                                <span className="hash-tag">#WcLoss</span></p>
                            </div>
                            <div className="text-muted">view all 288 comments</div>
                        </div>
                        <div className="feed">
                            <div className="head">
                                <div className="user">
                                    <div className="profile-photo">
                                        <img src={Logo} alt="Profile"/>
                                    </div>
                                    <div className="info">
                                        <h3>Roshan Yadav</h3>
                                        <small>Bihar,10 minutes ago</small>
                                    </div>
                                </div>
                                <span className="edit">
                                    <i className="uil uil-ellipsis-h"></i>
                                </span>
                            </div>


                            <div className="photo">
                                <img src={Logo} alt="Profile"/>
                            </div>

                            <div className="action-buttons">
                                <div className="interaction-buttons">
                                <span><i className="uil uil-thumbs-up"></i></span>
                                <span><i className="uil uil-comment"></i></span>
                                <span><i className="uil uil-share"></i></span>
                                </div>
                                <div className="bookmarks">
                                    <span><i className="uil uil-bookmark-full"></i></span>
                                </div>
                            </div>
                            <div className="liked-by">
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <p>Liked by<b>kalyani </b> and <b> and 2000 others </b></p>
                            </div>
                            <div className="caption">
                                <p><b>Roshan </b>So close yet so far.
                                <span className="hash-tag">#WcLoss</span></p>
                            </div>
                            <div className="text-muted">view all 288 comments</div>
                        </div>
                        <div className="feed">
                            <div className="head">
                                <div className="user">
                                    <div className="profile-photo">
                                        <img src={Logo} alt="Profile"/>
                                    </div>
                                    <div className="info">
                                        <h3>Roshan Yadav</h3>
                                        <small>Bihar,10 minutes ago</small>
                                    </div>
                                </div>
                                <span className="edit">
                                    <i className="uil uil-ellipsis-h"></i>
                                </span>
                            </div>


                            <div className="photo">
                                <img src={Logo} alt="Profile"/>
                            </div>

                            <div className="action-buttons">
                                <div className="interaction-buttons">
                                <span><i className="uil uil-thumbs-up"></i></span>
                                <span><i className="uil uil-comment"></i></span>
                                <span><i className="uil uil-share"></i></span>
                                </div>
                                <div className="bookmarks">
                                    <span><i className="uil uil-bookmark-full"></i></span>
                                </div>
                            </div>
                            <div className="liked-by">
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <p>Liked by<b>kalyani </b> and <b> and 2000 others </b></p>
                            </div>
                            <div className="caption">
                                <p><b>Roshan </b>So close yet so far.
                                <span className="hash-tag">#WcLoss</span></p>
                            </div>
                            <div className="text-muted">view all 288 comments</div>
                        </div>
                        <div className="feed">
                            <div className="head">
                                <div className="user">
                                    <div className="profile-photo">
                                        <img src={Logo} alt="Profile"/>
                                    </div>
                                    <div className="info">
                                        <h3>Roshan Yadav</h3>
                                        <small>Bihar,10 minutes ago</small>
                                    </div>
                                </div>
                                <span className="edit">
                                    <i className="uil uil-ellipsis-h"></i>
                                </span>
                            </div>


                            <div className="photo">
                                <img src={Logo} alt="Profile"/>
                            </div>

                            <div className="action-buttons">
                                <div className="interaction-buttons">
                                <span><i className="uil uil-thumbs-up"></i></span>
                                <span><i className="uil uil-comment"></i></span>
                                <span><i className="uil uil-share"></i></span>
                                </div>
                                <div className="bookmarks">
                                    <span><i className="uil uil-bookmark-full"></i></span>
                                </div>
                            </div>
                            <div className="liked-by">
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <span><img src={Logo} alt="Profile-Photos"/></span>
                                <p>Liked by<b>kalyani </b> and <b> and 2000 others </b></p>
                            </div>
                            <div className="caption">
                                <p><b>Roshan </b>So close yet so far.
                                <span className="hash-tag">#WcLoss</span></p>
                            </div>
                            <div className="text-muted">view all 288 comments</div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="messages">
                        <div className="heading">
                            <h4>Messages</h4><i className="uil uil-message"></i>
                        </div>
                        <div className="search-bar">
                        <i className="uil uil-search"></i>
                        <input type="search" placeholder="search messages" id="message-search"/>
                        </div>
                        <div className="category">
                            <h6 className="active">Primary</h6>
                            <h6>General</h6>
                            <h6 className="message-requests">Requests</h6>
                        </div>
                        <div className="message">
                            <div className="profile-photo">
                                <img src={Logo} alt="Profile"/>
                                <div className="active"></div>
                            </div>
                            <div className="message-body">
                                <h5>Fardeen</h5>
                                <p className="text-bold">Kaisa hai chutiye</p>
                            </div>
                        </div>
                    </div>

                    <div className="friend-requets">
                        <h4>Requests</h4>
                        <div className="request">
                            <div className="info">
                                <div className="profile-photo">
                                    <img src={Logo} alt="Profile"/>
                                </div>
                                <div>
                                    <h5>Anaya Jammy Khan</h5>
                                    <p className="text-muted">
                                        8 mutual friends
                                    </p>
                                </div>
                            </div>
                            <div className="action">
                                        <button className="btn btn-primary">
                                            Accept
                                        </button>
                                        <button className="btn">
                                            Decline
                                        </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <div className="customize-theme">
            <div className="card">
                <h2>Customize your theme</h2>
                <p>Manage your font size,color and background</p>

                <div className="font-size">
                    <h4>Font Size</h4>
                    <div>
                        <h5>Aa</h5>
                        <div className="choose-size">
                            <span className="font-size-1 active"></span>
                            <span className="font-size-2"></span>
                            <span className="font-size-3"></span>
                            <span className="font-size-4"></span>
                            <span className="font-size-5"></span>
                        </div>
                        <h3>Aa</h3>
                    </div>
                </div>

                <div className="color">
                    <h4>Color</h4>
                    <div className="choose-color">
                        <span className="color-1 active"></span>
                        <span className="color-2"></span>
                        <span className="color-3"></span>
                        <span className="color-4"></span>
                        <span className="color-5"></span>
                    </div>
                </div>

                <div className="background">
                    <h4>Background</h4>
                    <div className="choose-bg">
                        <div className="bg-1 active">
                            <span></span>
                            <h5 htmlFor="bg-1">Light</h5>
                        </div>
                        <div className="bg-2">
                            <span></span>
                            <h5 htmlFor="bg-2">Dim</h5>
                        </div>
                        <div className="bg-3">
                            <span></span>
                            <h5 htmlFor="bg-3">Lights out</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Main;