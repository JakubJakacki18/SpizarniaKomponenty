import axios from 'axios';
import { environment } from '../assets/env.ts';
const api_url = environment.API_URL;

const AxiosApi = {
axiosProducts : axios.create({
    baseURL: `${api_url}/api/product`,
    headers: {
        'Content-Type': 'application/json',
    },
}),

axiosProductModels : axios.create({
    baseURL: `${api_url}/api/productModel`,
    headers: {
        'Content-Type': 'application/json',
    },
}),

axiosRecipes : axios.create({
    baseURL: `${api_url}/api/recipe`,
    headers: {
        'Content-Type': 'application/json',
    },
}),

axiosCategories : axios.create({
    baseURL: `${api_url}/api/category`,
    headers: {
        'Content-Type': 'application/json',
    },
}),

axiosListOfProductsToBuy : axios.create({
    baseURL: `${api_url}/api/listOfProductsToBuy`,
    headers: {
        'Content-Type': 'application/json',
    },
}),



}
export default AxiosApi;
