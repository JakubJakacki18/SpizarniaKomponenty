import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategories, getAllCategories } from "../../../../features/category/categorySlice.ts";
import { Box, Button, TextField, Typography, List, ListItem, Divider } from "@mui/material";
import AxiosApi from "../../../../api/axiosApi.ts";
import { AxiosResponse } from "axios";

function CategoryManage() {
  const [newCategory, setNewCategory] = useState(""); // Stan lokalny dla nazwy nowej kategorii
  const categories = useSelector(getAllCategories); // Pobieranie listy kategorii z Redux
  const dispatch = useDispatch();

  // Pobranie kategorii z serwera przy pierwszym renderze
  const fetchCategories = async () => {
    try {
      const response: AxiosResponse = await AxiosApi.axiosCategories.get(""); // Pobranie danych z serwera
      dispatch(addCategories(response.data)); // Aktualizacja Redux Store
      console.log("Pobrane kategorie:", response.data);
    } catch (error) {
      console.error("Błąd podczas pobierania kategorii:", error);
    }
  };

  // Pobranie kategorii przy pierwszym renderze
  useEffect(() => {
    fetchCategories();
  }, []);

  // Obsługa zmiany w polu tekstowym
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value); // Aktualizacja lokalnego stanu
  };

  // Obsługa dodawania kategorii
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert("Nazwa kategorii nie może być pusta!");
      return;
    }

    // Sprawdzenie, czy kategoria już istnieje
    if (categories.some((category) => category.categoryName === newCategory)) {
      alert("Kategoria już istnieje!");
      return;
    }

    try {
      const response: AxiosResponse = await AxiosApi.axiosCategories.post("", {
        categoryName: newCategory, 
        productModels: [],
      });

    //   const newCategoryObject = {
    //     id: response.data.id, // ID z bazy danych
    //     categoryName: response.data.categoryName, // Nazwa kategorii
        // productModels: response.data.productModels, // Pusta tablica produktów (jeśli serwer zwraca tę właściwość)
    //   };

      // Aktualizacja stanu w Redux
      await fetchCategories();
      console.log(response)
      alert(`Dodano kategorię: ${newCategory}`);
      setNewCategory(""); // Reset pola tekstowego
    } catch (error) {
      console.error("Błąd podczas dodawania kategorii:", error);
      alert("Nie udało się dodać kategorii.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        backgroundColor: "#f9ece6",
        borderRadius: 2,
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Tytuł */}
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: 3, color: "#5d4037" }}
      >
        ZARZĄDZAJ KATEGORIAMI
      </Typography>

      {/* Formularz dodawania kategorii */}
      <TextField
        fullWidth
        required
        label="Dodaj nową kategorię"
        value={newCategory}
        onChange={handleCategoryChange}
        sx={{
          marginBottom: 3,
          "& .MuiInputBase-input": { color: "#4d3c34" },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddCategory}
      >
        Dodaj kategorię
      </Button>

      {/* Lista kategorii */}
      <Typography
        variant="h6"
        sx={{ marginTop: 4, marginBottom: 2, color: "#5d4037" }}
      >
        Istniejące kategorie:
      </Typography>
      <List>
        {categories.length > 0 ? (
          categories.map((category) => (
            <React.Fragment key={category.id}>
              <ListItem>
                <Typography sx={{ fontWeight: "bold" }}>
                  {category.categoryName}
                </Typography>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            Brak kategorii w systemie.
          </Typography>
        )}
      </List>
    </Box>
  );
}

export default CategoryManage;
