import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}
    //create new post
    //The token is like a password, it allows the user to authentificate to dataverse software apis
    //to perform actions as him

    export const createPost = createAsyncThunk('posts/createPost', async(postData, thunkAPI) => {

        try {
            const  token = thunkAPI.getState().auth.user.token
            return await postService.createPost(postData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || 
            error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

    export const getAllPosts = createAsyncThunk('posts/getAllPosts', async(page, thunkAPI) => {
        try {
            //const token = thunkAPI.getState().auth.user.token
            //return await postService.getAllPosts(token)
            return await postService.getAllPosts(page)

        } catch (error) {
            const message = 
                (error.response && 
                    error.response.data && 
                    error.response.data.message) ||
                    error.message || error.toString()
                return thunkAPI.rejectWithValue(message)
        }
    })

    export const getPostBySearch = createAsyncThunk('posts/getPostBySearch', async(data, thunkAPI) => {
        
        const {searchQuery, page} = data

        console.log(data)
        console.log(searchQuery)
        console.log(page)

        try {
              return await postService.getPostBySearch(searchQuery, page)
            
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

    export const getSelectedPost = createAsyncThunk('posts/getSelectedPost', async(id, thunkAPI) => {
        try {
                return await postService.getSelectedPost(id)
            
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

    export const postSlice = createSlice({
        name: 'posts',
        initialState,
        reducers: {
            //reset: (state) => initialState,
            reset: (state) => state.initialState,
        },
        extraReducers: (builder) => {
            builder
                .addCase(createPost.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(createPost.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.posts.push(action.payload)
                })
                .addCase(createPost.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(getAllPosts.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getAllPosts.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.posts = action.payload.posts
                    state.currentPage = action.payload.currentPage//I don't really use currentPage for pagination, may be I should remove it here and into the corresponding controller
                    state.numberOfPages = action.payload.numberOfPages
                })
                .addCase(getAllPosts.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(getPostBySearch.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getPostBySearch.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.posts = action.payload.posts
                    state.currentPage = action.payload.currentPage//I don't really use currentPage for pagination, may be I should remove it here and into the corresponding controller
                    state.numberOfPages = action.payload.numberOfPages
                })
                .addCase(getPostBySearch.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(getSelectedPost.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getSelectedPost.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.posts = action.payload
                })
                .addCase(getSelectedPost.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
        },
    })

    export const { reset } = postSlice.actions
    export default postSlice.reducer