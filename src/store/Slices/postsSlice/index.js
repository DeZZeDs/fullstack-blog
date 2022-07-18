import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../../api/instance";

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
    },
}

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading';
            state.posts.items = [];
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'success';
            state.posts.items.push(action.payload);
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.status = 'error';
            state.posts.items = [];
        },
        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading';
            state.tags.items = [];
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.status = 'success';
            state.tags.items = action.payload;
        },
        [fetchTags.rejected]: (state) => {
            state.tags.status = 'error';
            state.tags.items = [];
        }
    }
});

export const postReducer = postSlice.reducer;