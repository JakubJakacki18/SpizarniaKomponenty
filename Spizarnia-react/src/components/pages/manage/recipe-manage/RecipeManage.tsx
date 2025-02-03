import React, { useEffect, useState } from "react";
import {
    Box,
    ListSubheader,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addRecipes } from "../../../../features/recipes/recipeSlice.ts";
import AxiosApi from "../../../../api/axiosApi.ts";
import { AxiosResponse } from "axios";
import { addCategories, getAllCategories } from "../../../../features/category/categorySlice.ts";
import { Category } from "../../../../../../Spizarnia-backend/src/models/Category.ts";
import { ProductModel } from "../../../../../../Spizarnia-backend/src/models/ProductModel.ts";

const RecipeForm = () => {
    const [recipeName, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState([
        { id: 1, productModelId: "", quantity: 1 },
    ]);
    const [productModels, setProductModels] = useState([]);
    const categories : Category[] = useSelector(getAllCategories)
    const dispatch = useDispatch();

    // const fetchProductModels = async () => {
    //     if (productModels.length > 0) return; // Unikamy wielokrotnego pobierania

    //     try {
    //         console.log("Wysyłanie zapytania do API...");
    //         const response = await AxiosApi.axiosProductModels.get("/");
    //         console.log("Odpowiedź API:", response.data);
    //         setProductModels(response.data);
    //     } catch (error) {
    //         console.error("Błąd pobierania modeli produktów:", error.response?.data || error.message);
    //         alert(`Nie udało się pobrać produktów. Sprawdź połączenie z serwerem.`);
    //     }
    // };
    useEffect(() => {
        const fetchCategories = async () => 
        {
            try{
                console.log("Wysyłanie zapytania do API...");
                const response : AxiosResponse = await AxiosApi.axiosCategories.get('')
                console.log("Odpowiedź API:", response.data);
            dispatch(addCategories(response.data));
            }catch(error){
                console.error("Błąd pobierania modeli produktów:", error.response?.data || error.message);
                alert(`Nie udało się pobrać produktów. Sprawdź połączenie z serwerem.`);
            }
        }
        fetchCategories()
        },[dispatch])

    // if (productModels.length === 0) {
    //     fetchProductModels();
    // }

    const handleRecipeNameChange = (e) => {
        console.log(e.target.value)
        setRecipeName(e.target.value);
    };

    const handleIngredientChange = (id, field, value) => {
        console.log(ingredients)
        setIngredients((prevIngredients) =>
            prevIngredients.map((ingredient) =>
                ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
            )
        );
    };

    const handleAddIngredient = () => {
        setIngredients((prevIngredients) => [
            ...prevIngredients,
            { id: prevIngredients.length + 1, productModelId: "", quantity: 1 },
        ]);
    };

    const handleRemoveIngredient = (id) => {
        setIngredients((prevIngredients) =>
            prevIngredients.filter((ingredient) => ingredient.id !== id)
        );
    };

    const handleAddRecipe = async () => {
        if (!recipeName || ingredients.some((ingredient) => !ingredient.productModelId)) {
            alert("Wszystkie pola są wymagane!");
            return;
        }
        console.log(ingredients)
        const newRecipe = {
            name: recipeName,
            ingredients: ingredients.map((ingredient) => {
              const productModel = categories
                .flatMap((category) => category.productModels) 
                .find((model) => model?.id === parseInt(ingredient.productModelId)); 
          
                if (!productModel || productModel.id === undefined || productModel.id === -1) {
                    throw new Error(`Invalid product model for ingredient: ${ingredient.productModelId}`);
                  }
              return {
                productModel, 
                quantity: ingredient.quantity,
              };
            }),
            finished: true,
          };

        console.log("Dane wysyłane do backendu:", JSON.stringify(newRecipe, null, 2));

        try {
            const response = await AxiosApi.axiosRecipes.post("/", newRecipe);
            console.log("Dodano przepis:", response.data);
            dispatch(addRecipes(response.data));
            alert("Przepis został dodany!");
            setRecipeName("");
            setIngredients([{ id: 1, productModelId: "", quantity: 1 }]);
        } catch (error) {
            console.error("Błąd dodawania przepisu:", error.response?.data || error.message);
            alert(`Nie udało się dodać przepisu. Błąd: ${error.response?.data?.error || error.message}`);
        }
    };


    return (
        <>
            <div className="manage-content">
            <div className="title-manage">Dodaj kategorię</div>
            <div className="background-recipe-container">

        <Box className="form-recipe-container">
            <TextField 
                required
                fullWidth
                label="Nazwa"
                value={recipeName}
                onChange={handleRecipeNameChange}
                    sx={{
                        "& .MuiInputBase-root": {
                            backgroundColor: "var(--primary-color)",  // Set background color for the root
                        },
                        "& .MuiInputBase-input": {
                            color: "var(--font-color)",  // Ensure text is readable on top of the background color
                            fontFamily: "'Poppins', 'Arial Black', sans-serif",  // Correct font family array
                        },
                    }}
            />
                        <Typography variant="subtitle1" sx={{ fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', color: 'var(--secondary-left)', fontFamily: "'Poppins', 'Arial Black', sans-serif" }}>
                Dodaj składniki:
            </Typography>
            {ingredients.map((ingredient, index) => (
                <Box key={ingredient.id} sx={{ display: "flex", flexDirection: "column", marginBottom: 3, padding: 2, backgroundColor: "var(--primary-color)", borderRadius: 2, boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
                    <Typography sx={{ fontWeight: "bold", textTransform: 'uppercase', fontSize: 16, marginBottom: 1, color: "var(--font-color)", fontFamily: "'Poppins', 'Arial Black', sans-serif" }}>
                        Składnik {index + 1}
                    </Typography>
                    <TextField
                        required
                        select
                        label="Składnik"
                        value={ingredient.productModelId}
                        onChange={(e) => handleIngredientChange(ingredient.id, "productModelId", e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="" sx={{
                        display: "flex",
                        flexDirection: "column",
                        color: "var(--font-color)",
                        fontSize:20,
                        backgroundColor: "var(--secondary-right)",
                        fontFamily: "'Poppins', 'Arial Black', sans-serif",
                      }}>
                            Wybierz składnik
                        </MenuItem>
                        {categories.flatMap((category: Category) => [
                            <ListSubheader key={`header-${category.categoryName}`} sx={{
                          fontWeight: "bold",
                          display: "flex",
                          fontSize:18,
                          flexDirection: "column",
                              backgroundColor: "var(--secondary-left)",
                          fontFamily: "'Poppins', 'Arial Black', sans-serif",
                        }}>
                                {category.categoryName}
                            </ListSubheader>,
                            ...category.productModels?.map((product: ProductModel) => (
                                <MenuItem
                                    key={product.id}
                                    value={product.id}
                                    disabled={ingredients.some(i => parseInt(i.productModelId) === product.id)}
                                    sx={{
                              display: "flex",
                              color: "var(--font-color)",
                                                        backgroundColor: "var(--primary-color)",

                              fontFamily:
                                "'Poppins', 'Arial Black', sans-serif",
                            }}                                >
                                    {product.name}
                                </MenuItem>
                            )) || []
                        ])}
                    </TextField>
                    <TextField
                        required
                        label="Ilość"
                        type="number"
                        value={ingredient.quantity}
                        onChange={(e) => handleIngredientChange(ingredient.id, "quantity", Number(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        <button className="action-recipe-button" onClick={() => handleRemoveIngredient(ingredient.id)}>
                            Usuń składnik
                        </button>
                        <button className="action-recipe-button" onClick={handleAddIngredient}>
                        Dodaj składnik
                        </button>
                    </Box>
                </Box>
            ))}
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <button className="action-button" onClick={handleAddRecipe}>
                    Dodaj przepis
                </button>
            </Box>
                </Box>
                </div>
            </div>
        </>
    );
};

export default RecipeForm;