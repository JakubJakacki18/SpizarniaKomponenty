import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    productModels: [],
}


const productModelSlice = createSlice({
    name: "productModels",
    initialState,
    reducers: {
        addProductModels: (state, {payload}) => {
            state.productModels = payload;
        },
    },
    
});

export const {addProductModels} = productModelSlice.actions;
export const getAllProductModels = (state) => state.productModels.productModels; 
export default productModelSlice.reducer;