import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../../../Spizarnia-backend/src/models/Recipe.ts";
import { ProductState } from "../products/productSlice.ts";
import AxiosApi from "../../api/axiosApi.ts";
import { Ingredient } from "../../../../Spizarnia-backend/src/models/Ingredient.ts";
import { Status } from "../../shared/constances/statusType.ts";


interface RecipeState {
    recipes: any[];
    status: Status;
    error: any;
}

const initialState : RecipeState= {
    recipes: [],
    status: Status.idle,
    error: null,
}
interface RecipeWithStatus extends Recipe {
    isExecutable: boolean | undefined;
  }

async function isExecutable(ingredients : Ingredient[]) : Promise<Boolean> 
{
    let isExecutable = true;
    try{
        for (const ingredient of ingredients) {
            console.log(ingredient)
          const productCountResponse = await AxiosApi.axiosProducts(`getQuantity/${ingredient.productModel?.id}`)
          if (productCountResponse.data < ingredient.quantity) {
            isExecutable = false;
            break;
          }
        }
        return isExecutable
    }catch(error)
    {
        if (error.response?.status !== 404) {
            throw error;
        }
        return false;
          
    }

}

export const fetchRecipesWithExecutionStatus = createAsyncThunk<RecipeWithStatus[], void>(
    "recipes/fetchWithIsExecutable",
    async (_, { rejectWithValue }) => {
        try{
            const recipesResponse = await AxiosApi.axiosRecipes.get("")
            const recipes = recipesResponse.data;
            const recipesWithExecutable: RecipeWithStatus[] = await Promise.all(
                recipes.map(async (recipe) => {
                let isRecipeExecutable : Boolean | undefined;
                if (recipe.ingredients) {
                    isRecipeExecutable = await isExecutable(recipe.ingredients)
                }
                console.log("zwracana wartość",{ ...recipe,isRecipeExecutable })
                  return { ...recipe,isRecipeExecutable };
                })
              );
              return recipesWithExecutable;
            } catch (error) {
                return rejectWithValue(error.response?.data || "Unknown error");
            }
    }
);

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipes: (state, {payload}) => {
            state.recipes = payload;
        },
        
    },
    extraReducers: (builder) => 
        {
            builder
      .addCase(fetchRecipesWithExecutionStatus.pending, (state) => {
        state.status = Status.loading;
        state.error = null;
      })
      .addCase(fetchRecipesWithExecutionStatus.fulfilled, (state, action) => {
        state.status = Status.success;
        state.recipes = action.payload; 
      })
      .addCase(fetchRecipesWithExecutionStatus.rejected, (state, action) => {
        state.status = Status.error;
        state.error = action.payload;
      });

        }
    
});

export const {addRecipes} = recipeSlice.actions;
export const getAllRecipes = (state) => state.recipes.recipes; 
export default recipeSlice.reducer;