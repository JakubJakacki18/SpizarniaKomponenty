import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosApi from "../../api/axiosApi.ts";
import { Status } from "../../shared/constances/statusType.ts";

interface ListOfProductsToBuyState {
    listOfProductsToBuy : any[]; 
    status: Status;
    error: any; 
}

const initialState : ListOfProductsToBuyState = {
    listOfProductsToBuy: [],
    status: Status.idle,
    error: null,
    
}

export const editGroceryEntry = createAsyncThunk<{productToBuyId : string, newQuantity : string},{productToBuyId : string, newQuantity : string},{rejectValue:string}>(
    'listOfProductsToBuy/editGroceryEntry',
    async ({productToBuyId,newQuantity},{ rejectWithValue }) => {
      try {
        await AxiosApi.axiosListOfProductsToBuy.patch(`/${productToBuyId}`, {
            quantity: newQuantity,
          });
        return {productToBuyId,newQuantity}; 
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Error occurred');
      }
    }
  );


  export const deleteGroceryList = createAsyncThunk<void, void>(
    "listOfProductsToBuy/deleteAll",
    async (_, { rejectWithValue }) => {
      try {
        const response = await AxiosApi.axiosListOfProductsToBuy.post(`deleteAll`);
        console.log(response)
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Error occurred');
      }
    }
  );

    export const deleteGroceryEntry = createAsyncThunk<{productToBuyId : string},{productToBuyId : string}>(
      'listOfProductsToBuy/deleteGroceryEntry',
      async ({productToBuyId},{ rejectWithValue }) => {
        try{
          console.log(productToBuyId)
          await AxiosApi.axiosListOfProductsToBuy.delete(`/${productToBuyId}`)
          return {productToBuyId}
        }catch(error)
        {
          return rejectWithValue(error.response?.data || 'Error occurred');
        }
      }
    );
const listOfProductsToBuySlice = createSlice({
    name: "listOfProductsToBuy",
    initialState,
    reducers: {
        addListOfProductsToBuy: (state, {payload}) => {
            state.listOfProductsToBuy = payload;
        },
        
    },
        extraReducers: (builder) => {
            builder

            //editGroceryEntry
            .addCase(editGroceryEntry.pending, (state) => {
              state.status = Status.loading;
            })
            .addCase(editGroceryEntry.fulfilled, (state, action) => {
              state.status = Status.success;
              const groceryEntryIndex = state.listOfProductsToBuy.findIndex(
                (item) => item.id === action.payload.productToBuyId 
              );
              if (groceryEntryIndex !== -1) {
                state.listOfProductsToBuy[groceryEntryIndex].quantity = action.payload.newQuantity;
            }})
            .addCase(editGroceryEntry.rejected, (state, action) => {
              state.status = Status.error;
              state.error = action.payload;
            })

            //deleteGroceryEntry
            .addCase(deleteGroceryEntry.pending, (state) => {
              state.status = Status.loading;
            })
            .addCase(deleteGroceryEntry.fulfilled, (state, action) => {
              state.status = Status.success;
              state.listOfProductsToBuy = state.listOfProductsToBuy.filter(item => item.id !== action.payload.productToBuyId);
            })
            .addCase(deleteGroceryEntry.rejected, (state, action) => {
              state.status = Status.error;
              state.error = action.payload;
            })

            //deleteGroceryList
            .addCase(deleteGroceryList.pending, (state) => {
              state.status = Status.loading;
              state.error = null;
            })
            .addCase(deleteGroceryList.fulfilled, (state) => {
              state.status = Status.success;
              state.listOfProductsToBuy = []; 
            })
            .addCase(deleteGroceryList.rejected, (state, action) => {
              state.status = Status.error;
              state.error = action.payload;
            });


        }
    
});

export const {addListOfProductsToBuy} = listOfProductsToBuySlice.actions;
export const getAllListOfProductsToBuy= (state) => state.listOfProductsToBuy.listOfProductsToBuy; 
export default listOfProductsToBuySlice.reducer;