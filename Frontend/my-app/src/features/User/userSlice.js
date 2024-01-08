import { createSlice} from "@reduxjs/toolkit";



export const loginSlice=createSlice({
    name:'user',
    initialState:{
        currentUser:null,
    }
    ,reducers:{
        setUser:(state,action)=>{
            state.currentUser=action.payload
        },
        logoutUser:(state)=>{
            state.currentUser=null;
        },
    },
});

export const {setUser,logoutUser}=loginSlice.actions;
export default loginSlice.reducer;