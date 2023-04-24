import axios from 'axios'

const API_URL = 'http://localhost:8080/posts/';

//Create post

//The token is like a password, it allows the user to authentificate to dataverse software apis
//to perform actions as him

const createPost = async (posts, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    
    console.log(...posts)

    const response = await axios.post('http://localhost:8080/posts/uploadPost', posts);

    return response.data; 
    
}

const deletePost = async (postId) => {
    const response = await axios.delete(`http://localhost:8080/posts/deletePost/${postId}`)
   
    return response.data
}

const updatePost = async (postId, postInputs) => {

    const response = await axios.patch(`http://localhost:8080/posts/updatePost/${postId}`, postInputs)

    return response.data
}

const getAllPosts = async (page) => {
    /* const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    } */
    //const response = await axios.get(API_URL, config)
    const response = await axios.get(`http://localhost:8080/posts?page=${page}`)

    return response.data
}

const getPostBySearch = async (searchQuery, page) => {
    
    const response = await axios.get(`http://localhost:8080/posts/home_searched?searchQuery=${searchQuery}&page=${page}`)

    return response.data    
}

const getSelectedPost = async (id) => {
    
    const response = await axios.get(`http://localhost:8080/posts/homedetails/${id}`)

    return response.data    
} 
    
const getMyHomes = async (userid, page) => {
    
    const response = await axios.get(`http://localhost:8080/posts/my_homes?userid=${userid}&page=${page}`)

    return response.data    
}

const postService = {
    createPost,
    deletePost,
    updatePost,
    getAllPosts,
    getPostBySearch,
    getSelectedPost,
    getMyHomes
}

export default postService 