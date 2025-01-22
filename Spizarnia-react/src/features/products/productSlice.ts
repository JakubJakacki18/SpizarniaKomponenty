import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "../../shared/constances/statusType.ts";
import AxiosApi from "../../api/axiosApi.ts";

interface ProductState {
    products: any[]; 
    status: Status;
    error: any; 
}

const initialState : ProductState = {
    products: [],
    status: Status.idle,
    error: null,
}

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId, { rejectWithValue }) => {
      try {
        await AxiosApi.axiosProducts.delete(`/${productId}`);
        return productId; 
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Error occurred');
      }
    }
  );

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProducts: (state, {payload}) => {
            state.products = payload;
        },
    },
    extraReducers: (builder) => {
        builder
        // Obsługa akcji usuwania
        .addCase(deleteProduct.pending, (state) => {
          state.status = Status.loading;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.status = Status.success;
          // Usuwamy produkt z listy po ID
          state.products = state.products.filter((item) => item.id !== action.payload);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.status = Status.error;
          state.error = action.payload;
        });
    }
    
});

export const {addProducts} = productSlice.actions;
export const getAllProducts = (state) => state.products.products; 
export default productSlice.reducer;