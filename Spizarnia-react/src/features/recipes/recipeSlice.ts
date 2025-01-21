import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    recipes: [],
}


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