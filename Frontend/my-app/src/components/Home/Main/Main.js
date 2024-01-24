import React, { useEffect, useState } from "react";
import './Main.css'
import { addPostApi } from "../../../api/index.js";
import Logo from "../Images/Logo.png"
import Feeds from "./Feeds/feeds.js";
import Swal from "sweetalert2";
import myFunction from "./Function.js"
import ChatBox from "./Chat/ChatBox.js";
import axios from "axios";

const Main = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        myFunction();
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('tokenurl');
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://localhost:5000/username', config);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);


    const [formData, setData] = useState({
        caption: '',
        image: null,
    });

    const postShowAlertSuccess = () => {
        Swal.fire({
            title: 'Post Success',
            text: 'Post Posted',
            icon: 'success',
        });
    }

    const postShowAlertFail = () => {
        Swal.fire({
            title: 'Post Failed',
            text: 'Post not Posted',
            icon: 'error',
        });
    }

    const handleInputChange = (e) => {
        setData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append('caption', formData.caption);
            data.append('image', formData.image);

            await addPostApi(data);
            postShowAlertSuccess();
        } catch (error) {
            postShowAlertFail();
            console.error('Error creating post:', error);
        }
    }

    const [selectedUser, setSelectedUser] = useState(null);

    const handleOpenChat = (user) => {
        setSelectedUser(user);
    };

    const handleCloseChat = () => {
        setSelectedUser(null);
    };

    return (
        <>
            <main>
                <div className="container">
                    <div className="left">
                        <a href="/profile" className="profile">
                            <div className="profile-photo">
                                <img src={Logo} alt="Profiles" />
                            </div>
                            <div className="handle">
                                <h4>Jaikishen</h4>
                                <p className="text-muted">@jaikishen</p>
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
                                <span><i className="uil uil-bell"><small className="notification-count">9+</small></i></span><h3>Notifications</h3>
                                <div className="notifications-popup">
                                    <div>
                                        <div className="profile-photo">
                                            <img src={Logo} alt="Profile" />
                                        </div>
                                        <div className="notification-body">
                                            <b>Nikhil Mishra</b> accepted your friend request
                                            <small className="text-muted"> 2 Days Ago</small>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="profile-photo">
                                            <img src={Logo} alt="Profile" />
                                        </div>
                                        <div className="notification-body">
                                            <b>Jammy Khan</b> send you friend request
                                            <small className="text-muted"> 2 Days Ago</small>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="profile-photo">
                                            <img src={Logo} alt="Profile" />
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
                            <a href="/analytics" className="menu-item">
                                <span><i className="uil uil-analytics"></i></span><h3>Analytics</h3>
                            </a>
                            <a className="menu-item" id="theme">
                                <span><i className="uil uil-palette"></i></span><h3>Theme</h3>
                            </a>
                            <a href="/settings" className="menu-item">
                                <span><i className="uil uil-cog"></i></span><h3>Settings</h3>
                            </a>
                        </div>
                        <label htmlFor="create-post" className="btn btn-primary">Create Post</label>
                    </div>
                    <div className="center">
                        <div className="stories">
                            <div className="story">
                                <div className="profile-photo">
                                    <img src={Logo} alt="Post" />
                                </div>
                                <p className="name">Jaikishen Mishra</p>
                            </div>
                            <div className="story">
                                <div className="profile-photo">
                                    <img src={Logo} alt="Post" />
                                </div>
                                <p className="name">Nikhil Mishra</p>
                            </div>
                            <div className="story">
                                <div className="profile-photo">
                                    <img src={Logo} alt="Post" />
                                </div>
                                <p className="name">Jammy Mishra</p>
                            </div>
                            <div className="story">
                                <div className="profile-photo">
                                    <img src={Logo} alt="Post" />
                                </div>
                                <p className="name">Sharjeel Mishra</p>
                            </div>
                        </div>
                        <form action="" className="create-post" encType="multipart/form-data">
                            <div className="profile-photo">
                                <img src={Logo} alt="Post-Pic" />
                            </div>
                            <input type="text" placeholder="What's on your mind?" id="create-post" name="caption" value={formData.caption} onChange={handleInputChange} />
                            <input type="file" className="btn-primary"accept="image/*" name="image" id="create-post-image" onChange={handleImageChange} />
                            <input type="submit" value="Post" className="btn btn-primary" onClick={handleCreatePost} />
                        </form>
                        <Feeds />
                    </div>
                    <div className="right">
                        <div className="messages">
                            <div className="heading">
                                <h4>Messages</h4><i className="uil uil-message"></i>
                            </div>
                            <div className="search-bar">
                                <i className="uil uil-search"></i>
                                <input type="search" placeholder="search messages" id="message-search" />
                            </div>
                            <div className="category">
                                <h6 className="active">Primary</h6>
                                <h6>General</h6>
                                <h6 className="message-requests">Requests</h6>
                            </div>

                            {selectedUser ? (
                                <ChatBox user={selectedUser} onClose={handleCloseChat} />
                            ) : (
                                users.map(user => (
                                    <div
                                        key={user._id}
                                        className="message"
                                        onClick={() => handleOpenChat(user)}
                                    >
                                        <div className="profile-photo">
                                            <img src={Logo} alt="Profile" />
                                        </div>
                                        <div className="message-body">
                                            <h5>{user.username}</h5>
                                        </div>
                                    </div>
                                ))
                            )}

                        </div>

                        <div className="friend-requets">
                            <h4>Requests</h4>
                            <div className="request">
                                <div className="info">
                                    <div className="profile-photo">
                                        <img src={Logo} alt="Profile" />
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
                    <p>Manage your font size, color, and background</p>

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
