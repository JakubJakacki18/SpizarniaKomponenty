import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AxiosApi from "../../../api/axiosApi.ts";
import { addRecipes } from "../../../features/recipes/recipeSlice.ts";

function Recipes() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchRecipes = async () => {
        try {
            const response : AxiosResponse = await AxiosApi.axiosRecipes.get('')//.catch((error) => {console.error('Error: ', error)});
            dispatch(addRecipes(response.data));
            console.log(response.data);
        }
        catch(error) {
            console.error('Error: ', error);
        }
        }
        fetchRecipes();
        
    }, [dispatch]);
    return (
        <div>
            <h1>Recipes</h1>
            <p>To jest strona główna aplikacji.</p>
        </div>
    );
}

export default Recipes;

