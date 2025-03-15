import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesWithExecutionStatus, getAllRecipes } from "../../../features/recipes/recipeSlice.ts";
import { NavLink } from "react-router-dom";
import StyleFunctions from "../../../shared/styleFunctions.ts";
import RecipesList from "./RecipesList.tsx";
import { AppDispatch } from "../../../features/store.ts";

function Recipes() {
    const dispatch = useDispatch<AppDispatch>();
    const allRecipes = useSelector(getAllRecipes); // Pobranie przepisów z Redux
    const [searchTerm, setSearchTerm] = useState(""); // Stan wyszukiwarki

    useEffect(() => {
        dispatch(fetchRecipesWithExecutionStatus());
    }, [dispatch]);

    // Filtrujemy przepisy na podstawie wyszukiwanego hasła
    const filteredRecipes = allRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="header-container">
                <div className="title">Przepisy</div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Wyszukaj przepis..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <NavLink
                        to="/manage/recipe"
                        className={({ isActive }) => StyleFunctions.classNameSelectorNavButton(isActive)}>
                        Dodaj przepis
                    </NavLink>
                </div>
            </div>

            <div className="site-content">
                <RecipesList recipes={filteredRecipes} />
            </div>
        </>
    );
}

export default Recipes;