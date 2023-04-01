import axios from 'axios'

const API_URL = 'http://localhost:8080/posts/';

//Create post

//The token is like a password, it allows the user to authentificate to dataverse software apis
//to perform actions as him


const createPost = async (postData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post('http://localhost:8080/posts/', postData);

    return response.data;
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

/* Finally I don't use this function to display a post 

    const getSelectedPost = async (id) => {
    
    const response = await axios.get(`http://localhost:8080/posts/homedetails/${id}`)

    return response.data    
} */

const postService = {
    createPost,
    getAllPosts,
    getPostBySearch,
    //getSelectedPost
}

export default postService 