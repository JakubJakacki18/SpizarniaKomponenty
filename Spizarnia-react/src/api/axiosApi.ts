import axios from 'axios';
const AxiosApi = {
axiosProducts : axios.create({
    baseURL: 'http://localhost:5000/api/product',
    headers: {
        'Content-Type': 'application/json',
    },
}),

axiosProductModels : axios.create({
    baseURL: 'http://localhost:5000/api/productModel',
    headers: {
        'Content-Type': 'application/json',
    },
}),

axiosRecipes : axios.create({
    baseURL: 'http://localhost:5000/api/recipe',
    headers: {
        'Content-Type': 'application/json',
    },
}),

axiosCategories : axios.create({
    baseURL: 'http://localhost:5000/api/category',
    headers: {
        'Content-Type': 'application/json',
    },
}),

axiosListOfProductsToBuy : axios.create({
    baseURL: 'http://localhost:5000/api/listOfProductsToBuy',
    headers: {
        'Content-Type': 'application/json',
    },
}),



}
export default AxiosApi;
