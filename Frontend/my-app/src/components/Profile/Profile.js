
import React, { useState, useEffect } from 'react';
import './Profile.css';
import Navbar from '../Home/Navbar/Navbar.js';
import Logo from '../Home/Images/Logo.png';
import { fetchProfileData,updateBio } from '../../api/index.js';

const Profile = () => {
    const [userData, setUserData] = useState({
        followers: 0,
        following: 0,
        posts: 0,
        username: '',
        fullName: '',
        userImage: '',
        bio: '',
    });

    const [isEditingBio, setIsEditingBio] = useState(false);
    const [editedBio, setEditedBio] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = localStorage.getItem('token');
                const response = await fetchProfileData(username);
                // Handle the response and update state
                setUserData(response);
                setEditedBio(response.bio);
            } catch (error) {
                console.error('Error in fetching profile data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditBio = () => {
        setIsEditingBio(true);
    };

    const handleSaveBio = async () => {
        try {
            const username=localStorage.getItem('token');
            await updateBio(username, editedBio);

            // Update the local state
            setUserData(prevData => ({
                ...prevData,
                bio: editedBio,
            }));

            setIsEditingBio(false);
        } catch (error) {
            console.error('Error updating bio:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='profile-container'>
                <div className='profile'>
                    <img className='user-image' src={Logo} alt='User' />
                    <button className='edit-button'>edit</button>
                    <div className='profile-info'>
                        <div>
                            <h4 className='user-name'>{userData.username}</h4>
                            <span className='original-name'>{userData.fullName}</span>
                        </div>
                        <div className='numbers'>
                            <a href='' className='num'>
                                <div>{userData.followers}</div>
                                <div>followers</div>
                            </a>
                            <a className='num'>
                                <div>{userData.following}</div>
                                <div>following</div>
                            </a>
                            <a className='num'>
                                <div>{userData.posts}</div>
                                <div>posts</div>
                            </a>
                        </div>
                        <hr className='hr' />
                    </div>
                    <div className='profile-bottom'>
                        <div className='left-about'>
                            {isEditingBio ? (
                                <>
                                    <textarea
                                        value={editedBio}
                                        onChange={(e) => setEditedBio(e.target.value)}
                                        rows={4}
                                        cols={50}
                                    />
                                    <button onClick={handleSaveBio}>Save</button>
                                </>
                            ) : (
                                <>
                                    <ul>
                                        <li className='uil uil-home'>{userData.bio}</li>
                                    </ul>
                                    <button onClick={handleEditBio} className='btn btn-secondary'>Edit Bio</button>
                                </>
                            )}
                        </div>
                        <div className='friend-request'>
                            {/* Friend request button and content */}
                            <button>Add Friend</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
