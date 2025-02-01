import React from "react";
import RecipeAccordion from "./RecipeAccordion.tsx";

type RecipesListProps = {
    recipes: any[];
};

function RecipesList({ recipes }: RecipesListProps) {
    if (!Array.isArray(recipes)) {
        console.error("Błąd: recipes nie jest tablicą", recipes);
        return <p className="error-message">Wystąpił błąd, nie można załadować przepisów.</p>;
    }

    if (recipes.length === 0) {
        return <p className="no-recipes">Brak dostępnych przepisów</p>;
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
