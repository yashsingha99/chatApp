import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    light:false
}

export const toggleSlice = createSlice({
    name:"toggle",
    initialState,
    reducers:{
        changeToggle:(state, action) => {
         state.light = action.payload;
        }
    }
})

export const {changeToggle} = toggleSlice.actions
export default toggleSlice.reducer