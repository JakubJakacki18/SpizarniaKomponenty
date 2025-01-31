import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../../../Spizarnia-backend/src/models/Recipe.ts";
import { ProductState } from "../products/productSlice.ts";
const initialState = {
    recipes: [],
}


export const fetchRecipesWithExecutionStatus = createAsyncThunk<Recipe[], Recipe[], { state: { products: ProductState  } }>(
    "recipes/fetchWithIsExecutable",
    async (recipes, { getState }) => {
        const state = getState();
        const availableProducts = state.products;
        const updatedRecipes = recipes.map(recipe => {
            const hasEnoughProducts = recipe.ingredients?.every(({ productModel, quantity }) => {
                //const productInStock = availableProducts.find(p => p.id === id);
                //return productInStock && productInStock.quantity >= quantity;
            });

            return { ...recipe, isExecutable: hasEnoughProducts };
        });

        return updatedRecipes;
    }
);

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipes: (state, {payload}) => {
            state.recipes = payload;
        },
        
    },
    
});

export const {addRecipes} = recipeSlice.actions;
export const getAllRecipes = (state) => state.recipes.recipes; 
export default recipeSlice.reducer;