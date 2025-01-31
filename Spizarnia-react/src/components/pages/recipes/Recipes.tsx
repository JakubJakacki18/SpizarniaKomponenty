import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AxiosApi from "../../../api/axiosApi.ts";
import { addRecipes, fetchRecipesWithExecutionStatus } from "../../../features/recipes/recipeSlice.ts";
import { NavLink } from "react-router-dom";
import StyleFunctions from "../../../shared/styleFunctions.ts";
import RecipesList from "./RecipesList.tsx";
import { AppDispatch } from "../../../features/store.ts";

function Recipes() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const fetchRecipes = async () => {
        try {
            //const response : AxiosResponse = await AxiosApi.axiosRecipes.get('')//.catch((error) => {console.error('Error: ', error)});
            dispatch(fetchRecipesWithExecutionStatus())
            //dispatch(addRecipes(response.data));
            //console.log(response.data);
        }
        catch(error) {
            console.error('Error: ', error);
        }
        }
        fetchRecipes();
        
    }, [dispatch]);
    function onSearch(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <>
        <div className="header-container">
        <div className="title">Przepisy</div>
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
        <RecipesList/>
      </div>
        </>
    );
}

export default Recipes;

