import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/User/userSlice'
import authReducer from '../features/Auth/authSlice'
import postReducer from '../features/Post/postSlice';

const store=configureStore({
    reducer:{
        user:userReducer,
        auth:authReducer,
        post:postReducer,
    },
});

export default store;