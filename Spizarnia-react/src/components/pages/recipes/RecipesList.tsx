import React from "react";
import { getAllRecipes } from "../../../features/recipes/recipeSlice.ts";
import { useSelector } from "react-redux";
import RecipeAccordion from "./RecipeAccordion.tsx";

function RecipesList() 
{
    const recipes = useSelector(getAllRecipes);
    console.log("Przepisy",recipes);
    return (
    <>
        {
            recipes.map((recipe) => {
                return <RecipeAccordion
                key={recipe.id}
                {...recipe}/>
            })
        
        }    
    </>);
}

export default RecipesList;