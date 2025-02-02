import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosApi from "../../api/axiosApi.ts";
import { Status } from "../../shared/constances/statusType.ts";

interface ProductState {
    productModels: any[];
    status: Status;
    error: any;
}

const initialState: ProductState = {
    productModels: [],
    status: Status.idle,
    error: null,
};

export const fetchProductModels = createAsyncThunk(
    "productModels/fetchProductModels",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AxiosApi.axiosProductModels.get("");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching product models");
        }
    }
);

export const deleteProductModel = createAsyncThunk<string, string, { rejectValue: string }>(
    "productModels/deleteProductModel",
    async (id, { rejectWithValue }) => {
        try {
            await AxiosApi.axiosProductModels.delete(`/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error occurred");
        }
    }
);

export const updateProductModel = createAsyncThunk<any, any, { rejectValue: string }>(
    "productModels/updateProductModel",
    async (updatedProduct, { rejectWithValue }) => {
        try {
            console.log("Updating product:", updatedProduct); // Debugging log
            const response = await AxiosApi.axiosProductModels.put(`/${updatedProduct.id}`, updatedProduct);
            console.log("Updated product response:", response.data); // Debugging log
            return response.data;
        } catch (error) {
            console.error("Update failed:", error);
            return rejectWithValue(error.response?.data || "Error occurred");
        }
    }
);


const productModelSlice = createSlice({
    name: "productModels",
    initialState,
    reducers: {
        addProductModels: (state, { payload }) => {
            state.productModels = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductModels.pending, (state) => {
                state.status = Status.loading;
            })
            .addCase(fetchProductModels.fulfilled, (state, action) => {
                state.status = Status.success;
                state.productModels = action.payload;
            })
            .addCase(fetchProductModels.rejected, (state, action) => {
                state.status = Status.error;
                state.error = action.payload;
            })
            .addCase(deleteProductModel.pending, (state) => {
                state.status = Status.loading;
            })
            .addCase(deleteProductModel.fulfilled, (state, action) => {
                state.status = Status.success;
                state.productModels = state.productModels.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteProductModel.rejected, (state, action) => {
                state.status = Status.error;
                state.error = action.payload;
            })
            .addCase(updateProductModel.pending, (state) => {
                state.status = Status.loading;
            })
            .addCase(updateProductModel.fulfilled, (state, action) => {
                state.status = Status.success;

                const index = state.productModels.findIndex((item) => item.id === action.meta.arg.id);
                if (index !== -1) {
                    state.productModels[index] = {
                        ...state.productModels[index], 
                        ...action.meta.arg, 
                        category: action.payload.category || state.productModels[index].category, // Merge backend category update
                    };
                }
            })
            .addCase(updateProductModel.rejected, (state, action) => {
                state.status = Status.error;
                state.error = action.payload;
            });
    },
});

export const { addProductModels } = productModelSlice.actions;
export const getAllProductModels = (state) => state.productModels.productModels;
export default productModelSlice.reducer;
