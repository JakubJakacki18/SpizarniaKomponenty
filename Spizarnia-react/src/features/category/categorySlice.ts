import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    categories: [],
}


const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategories: (state, {payload}) => {
            state.categories = payload;
        },
    },
    
});

export const {addCategories} = categorySlice.actions;
export const getAllCategories = (state) => state.categories.categories; 
export default categorySlice.reducer;