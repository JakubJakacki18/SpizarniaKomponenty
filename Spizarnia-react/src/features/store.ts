import {configureStore} from '@reduxjs/toolkit';
import productReducer from './products/productSlice.ts';
import productModelReducer from './productModels/productModelSlice.ts';
import recipeReducer from './recipes/recipeSlice.ts'
import categoryReducer from './category/categorySlice.ts'
import listOfProductsToBuyReducer from './listOfProductsToBuy/listOfProductsToBuySlice.ts'


export const store = configureStore({
    reducer: {
        products:productReducer,
        recipes:recipeReducer,
        categories:categoryReducer,
        listOfProductsToBuy:listOfProductsToBuyReducer,
        productModels:productModelReducer
    },
});

export type AppDispatch = typeof store.dispatch;