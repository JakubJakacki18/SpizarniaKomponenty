import {configureStore} from '@reduxjs/toolkit';
import productReducer from './products/productSlice.ts';
export const store = configureStore({
    reducer: {
        products:productReducer,
    },
});