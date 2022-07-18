import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../api/instance";


const initialState = {
    data: null,
    logged: false,
    status: 'loading',
    msg: '',
}

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {fullName, email, passwordHash} = params;
    const {data} = await axios.post('/register', {
        fullName,
        email,
        passwordHash
    });
    return data;

});

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async(params) => {
    const {email, passwordHash} = params;
    const {data} = await axios.post('/login', {
        email,
        passwordHash,
    });
    return data;
});

export const fetchProfile = createAsyncThunk('auth/getProfile', async() => {
    const {data} = await axios.get('/me');
    return data;
});

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
       setLogged: (state, action) => {
           state.logged = action.payload;
           state.data = null;
       }
   },
   extraReducers: {
       [fetchAuth.pending]:(state) => {
           state.data = null;
           state.status = 'loading';
           state.logged = false;
           state.msg = '';
       },
       [fetchAuth.fulfilled]:(state,action) => {
           state.data = action.payload;
           state.status = 'success';
       },
       [fetchAuth.rejected]:(state) => {
           state.data = null;
           state.status = 'loading';
           state.logged = false;
           state.msg = '';
       },
       [fetchProfile.pending]:(state) => {
           state.data = null;
           state.status = 'loading';
           state.logged = false;
           state.msg = '';
       },
       [fetchProfile.fulfilled]:(state,action) => {
           state.data = action.payload;
           state.status = 'success';
           state.logged = true;
       },
       [fetchProfile.rejected]:(state) => {
           state.data = null;
           state.status = 'loading';
           state.logged = false;
           state.msg = '';
       },
       [fetchRegister.pending]:(state) => {
           state.data = null;
           state.status = 'loading';
           state.logged = false;
           state.msg = '';
       },
       [fetchRegister.fulfilled]:(state,action) => {
           state.data = action.payload;
           state.status = 'success';
       },
       [fetchRegister.rejected]:(state, action) => {
           state.data = action.payload;
           state.status = 'error';
           state.logged = false;
       }
   }
});


export const authReducer = authSlice.reducer;

export const { setLogged } = authSlice.actions;
