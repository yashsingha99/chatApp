import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userData: null,
    status : false,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login: (state, action) => {
             state.userData = action.payload,
             state.status = true
        },
        logout: (state) => {
            state.userData = null,
            state.status = false
        }
    } 
})


export const {login, logout} = authSlice.actions
export default authSlice.reducer