import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosApi from "../../api/axiosApi.ts";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AxiosApi.axiosCategories.get("");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching categories");
        }
    }
);

const initialState = {
    categories: [],
    status: "idle",
    error: null,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategories: (state, { payload }) => {
            state.categories = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { addCategories } = categorySlice.actions;
export const getAllCategories = (state) => state.categories.categories;
export default categorySlice.reducer;
