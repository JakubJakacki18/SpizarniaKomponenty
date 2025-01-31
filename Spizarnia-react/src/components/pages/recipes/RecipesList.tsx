import React from "react";
import { getAllRecipes } from "../../../features/recipes/recipeSlice.ts";
import { useSelector } from "react-redux";
import RecipeAccordion from "./RecipeAccordion.tsx";

function RecipesList() {
    const recipes = useSelector(getAllRecipes) || []; // Zapewnienie, �e recipes to zawsze tablica

    console.log("Aktualne przepisy w Redux:", recipes);

    if (!Array.isArray(recipes)) {
        console.error("B��d: recipes nie jest tablic�", recipes);
        return <p className="error-message">Wyst�pi� b��d, nie mo�na za�adowa� przepis�w.</p>;
    }

    if (recipes.length === 0) {
        return <p className="no-recipes">Brak dost�pnych przepis�w</p>;
    }

    return (
        <div className="recipes-list">
            {recipes.map((recipe) => (
                <RecipeAccordion key={recipe.id} {...recipe} />
            ))}
        </div>
    );
}

export default RecipesList;