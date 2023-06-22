import axios from 'axios'

const API_URL = 'http://localhost:8080/user'

//const API_URL = 'https://houz-koe3.onrender.com/user'; 

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + '/signup', userData)

    //axios return an object with a ".data"
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user

const login = async (userData) => {
    const response = await axios.post(API_URL + '/signin', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
}

export default authService