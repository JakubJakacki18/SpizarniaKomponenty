import { environment } from "../../../../assets/env";

//ścieżka do strony
const BASE_URL = environment.apiUrl;

//ścieżki do api
export const PRODUCT_MODELS = BASE_URL + "/api/productModel/"
export const PRODUCTS = BASE_URL + "/api/product/"
export const CATEGORIES = BASE_URL + "/api/category/"
export const CONTAINERS = BASE_URL + "/api/container/"
export const RECIPES = BASE_URL + "/api/recipe/"
export const LISTOFPRODUCTSTOBUY = BASE_URL + "/api/listOfProductsToBuy/"
export const SUBSCRIPTION_URL = BASE_URL + '/api/subscribe';

