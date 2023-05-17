import axios from 'axios'

//const API_URL = `http://localhost:8080/posts`

const API_URL = 'https://houz-koe3.onrender.com/posts'; 

//The token is like a password, it allows the user to authentificate to dataverse software apis
//to perform actions as him

const createPost = async (posts, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }    
    
    try {
        const response = await axios.post(API_URL + '/uploadPost', posts);

        return response.data;     
        
    } catch (error) {
        res.status(500).json(error)
    }

    
}

const deletePost = async (postId) => {
    const response = await axios.delete(API_URL + `/deletePost/${postId}`)
   
    return response.data
}

const updatePost = async (postId, postInputs) => {

    const response = await axios.patch(API_URL + `/updatePost/${postId}`, postInputs)

    return response.data
}

const getAllPosts = async (page) => {
    /* const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    } */
    //const response = await axios.get(API_URL, config)
    const response = await axios.get(API_URL + `?page=${page}`)

    return response.data
}

const getPostBySearch = async (searchQuery, page) => {
    
    const response = await axios.get(API_URL + `/home_searched?searchQuery=${searchQuery}&page=${page}`)

    return response.data    
}

const getSelectedPost = async (id) => {
    
    const response = await axios.get(API_URL + `/homedetails/${id}`)

    return response.data    
} 
    
const getMyHomes = async (userid, page) => {
    
    const response = await axios.get(API_URL + `/my_homes?userid=${userid}&page=${page}`)

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