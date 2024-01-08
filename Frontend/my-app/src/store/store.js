import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/User/userSlice'
import authReducer from '../features/Auth/authSlice'

const store=configureStore({
    reducer:{
        user:userReducer,
        auth:authReducer,
    },
});

export default store;