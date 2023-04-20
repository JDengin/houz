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

    export const createPost = createAsyncThunk('posts/createPost', async(posts, thunkAPI) => {
        
        try {
            const  token = thunkAPI.getState().auth.user.token
            return await postService.createPost(posts, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || 
            error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

    export const deletePost = createAsyncThunk('posts/deletePost', async(postId, thunkAPI) => {
        
        try {
            return await postService.deletePost(postId)
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

    export const updatePost = createAsyncThunk('posts/updatePost', async(data, thunkAPI) => {

        console.log("Inside updatePost slice")
        
        const {postId, postInputs} = data
        try {
            return await postService.updatePost(postId, postInputs)
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) ||
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

    export const getMyHomes = createAsyncThunk('posts/getMyHomes', async(data, thunkAPI) => {
        
        const {userid, page} = data

        try {
              return await postService.getMyHomes(userid, page)
            
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
                .addCase(deletePost.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(deletePost.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.posts = state.posts.filter(
                        (post) => post._id !== action.payload.id
                    )
                })
                .addCase(deletePost.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(updatePost.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(updatePost.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
                })
                .addCase(updatePost.rejected, (state, action) => {
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
                .addCase(getMyHomes.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getMyHomes.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.posts = action.payload.posts
                    state.currentPage = action.payload.currentPage//I don't really use currentPage for pagination, may be I should remove it here and into the corresponding controller
                    state.numberOfPages = action.payload.numberOfPages
                })
                .addCase(getMyHomes.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
        },
    })

    export const { reset } = postSlice.actions
    export default postSlice.reducer