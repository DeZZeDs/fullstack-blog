import {configureStore} from '@reduxjs/toolkit';
import {postReducer} from "./Slices/postsSlice";
import {authReducer} from "./Slices/authSlice";

export const store = configureStore({
    reducer: {
        postReducer,
        authReducer,
    },
})