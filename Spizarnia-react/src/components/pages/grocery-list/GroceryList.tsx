import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AxiosApi from "../../../api/axiosApi.ts";
import { addListOfProductsToBuy } from "../../../features/listOfProductsToBuy/listOfProductsToBuySlice.ts";
import { NavLink } from "react-router-dom";
import StyleFunctions from "./../../../shared/styleFunctions.ts"
import GroceryTable from "./GroceryTable.tsx";

 

function GroceryList() {
    const dispatch = useDispatch();

    const deleteGroceryList = () => {

    }

    useEffect(() => {
        const fetchListOfProductsToBuy = async () => {
        try {
            const response : AxiosResponse = await AxiosApi.axiosListOfProductsToBuy.get('')//.catch((error) => {console.error('Error: ', error)});
            dispatch(addListOfProductsToBuy(response.data));
            console.log(response.data);
        }
        catch(error) {
            console.error('Error: ', error);
        }
        }
        fetchListOfProductsToBuy();
        
    }, [dispatch]);
    return (
        <>
        <div className="header-container">
        <div className="title">Lista zakupów</div>
        <div className="search-bar">
          <input type="text"
                 placeholder="Wyszukaj przepis..."/>
          <button className="action-button" onClick={deleteGroceryList}>
            Szukaj
          </button>
        <NavLink to="/manage/recipe" className={({ isActive }) => StyleFunctions.classNameSelectorNavButton(isActive)}>Dodaj przepis</NavLink >
        </div>
      </div>
      <div className="site-content">
        <GroceryTable/>
      </div>
        </>
    );
}

export default GroceryList



