import {configureStore} from '@reduxjs/toolkit'
import toggleSlice from './toggleSlice'
import authSlice from './authSlice'
export const store = configureStore({
    reducer:{
        toggle:toggleSlice,
        auth:authSlice,
    }
})