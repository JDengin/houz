import axios from 'axios'

const API_URL = 'http://localhost:8080/posts/';

//Create post

const createPost = async (postData) => {
    const response = await axios.post(API_URL, postData);

    return response.data;
}

const postService = {
    createPost,
}

export default postService ; 