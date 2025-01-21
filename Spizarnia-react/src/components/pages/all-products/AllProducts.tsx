import React, { useEffect } from "react";
import AxiosApi from "../../../api/axiosApi.ts";
import { useDispatch } from "react-redux";
import { addProducts } from "../../../features/products/productSlice.ts";
import { AxiosResponse } from "axios";
import ProductList from "./ProductsList.tsx";

function AllProducts() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response : AxiosResponse = await AxiosApi.axiosProducts.get('')//.catch((error) => {console.error('Error: ', error)});
            dispatch(addProducts(response.data));
            console.log(response.data);
        }
        catch(error) {
            console.error('Error: ', error);
        }
        }
        fetchProducts();
        
    }, [dispatch]);


    return (
        <ProductList/>
    );
}

export default AllProducts
