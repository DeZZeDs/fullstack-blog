import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4444/api'
});

instance.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export default instance;