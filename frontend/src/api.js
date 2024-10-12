import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/auth/register`, userData, { withCredentials: true });
};

export const loginUser = async (userData) => {
    return await axios.post(`${API_URL}/auth/login`, userData, { withCredentials:true });
};

export const createPost = async (postData) => {
    return await axios.post(`${API_URL}/posts`, postData, { withCredentials: true });
};

export const getAllPosts = async () => {
    return await axios.get(`${API_URL}/posts`, { withCredentials: true });
};
