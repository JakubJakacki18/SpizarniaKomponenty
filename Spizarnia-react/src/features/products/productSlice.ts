import { createSlice } from "@reduxjs/toolkit";
import {Product} from "../../../../Spizarnia-backend/src/models/Product";
const initialState = {
    products: [],
}


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProducts: (state, {payload}) => {
            state.products = payload;
        },
    },
    
});

export const {addProducts} = productSlice.actions;
export const getAllProducts = (state) => state.products.products; 
export default productSlice.reducer;