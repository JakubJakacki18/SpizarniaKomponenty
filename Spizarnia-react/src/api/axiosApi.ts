import axios from 'axios';

const axiosProducts = axios.create({
    baseURL: 'http://localhost:5000/api/product',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosProducts;