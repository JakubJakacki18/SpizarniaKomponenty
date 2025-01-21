import React, { useEffect } from "react";
import AxiosApi from "../../../api/axiosApi.ts";
import { useDispatch } from "react-redux";
import { addProducts } from "../../../features/products/productSlice.ts";
import { AxiosResponse } from "axios";
import ProductList from "./ProductsList.tsx";
import { NavLink } from "react-router-dom";
import StyleFunctions from "../../../shared/styleFunctions.ts";

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


    function onSearch(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <>
        <div className="header-container">
        <div className="title">Moja spiżarnia</div>
        <div className="search-bar">
          <input type="text"
                 placeholder="Wyszukaj przepis..."/>
          <button className="action-button" onClick={onSearch}>
            Szukaj
          </button>
        <NavLink to="/manage/recipe" className={({ isActive }) => StyleFunctions.classNameSelectorNavButton(isActive)}>Dodaj przepis</NavLink >
        </div>
      </div>
      <div className="site-content">
        <ProductList/>
      </div>
        </>
    );
}

export default AllProducts
