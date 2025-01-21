import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    listOfProductsToBuy: [],
}


const listOfProductsToBuySlice = createSlice({
    name: "listOfProductsToBuy",
    initialState,
    reducers: {
        addListOfProductsToBuy: (state, {payload}) => {
            state.listOfProductsToBuy = payload;
        },
    },
    
});

export const {addListOfProductsToBuy} = listOfProductsToBuySlice.actions;
export const getAllListOfProductsToBuy= (state) => state.listOfProductsToBuy.listOfProductsToBuy; 
export default listOfProductsToBuySlice.reducer;