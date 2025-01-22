import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategories, getAllCategories } from "../../../../features/category/categorySlice.ts";
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import AxiosApi from "../../../../api/axiosApi.ts";
import { AxiosResponse } from "axios";

interface FormData {
  categoryName: string; 
}

function CategoryManage() {
  const categories = useSelector(getAllCategories);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" }); 
 
  const fetchCategories = async () => {
    try {
      const response: AxiosResponse = await AxiosApi.axiosCategories.get(""); 
      dispatch(addCategories(response.data)); 
    } catch (error) {
      console.error("Błąd podczas pobierania kategorii:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (data: FormData) => {
    const { categoryName } = data;

    if (categories.some((category) => category.categoryName === categoryName)) {
      alert("Kategoria już istnieje!");
      return;
    }

    try {
      await AxiosApi.axiosCategories.post("", {
        categoryName: categoryName,
        productModels: [],
      });

      await fetchCategories();
      alert(`Dodano kategorię: ${categoryName}`);
      reset(); 
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
      <form onSubmit={handleSubmit(handleAddCategory)}>
        <TextField
          fullWidth
          label="Dodaj nową kategorię"
          {...register("categoryName", {
            required: "Nazwa kategorii jest wymagana.", // Walidacja: pole wymagane
            pattern: {
              value: /^[A-Z][a-zA-Z\s]*$/,
              message: "Nazwa musi zaczynać się od wielkiej litery i zawierać tylko litery.",
            },
          })}
          error={!!errors.categoryName} // Ustawienie błędu
          helperText={errors.categoryName?.message} // Wyświetlenie komunikatu o błędzie
          sx={{
            marginBottom: 3,
            "& .MuiInputBase-input": { color: "#4d3c34" },
          }}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Dodaj kategorię
        </Button>
      </form>

      {/* Tabela kategorii */}
      <Typography
        variant="h6"
        sx={{ marginTop: 4, marginBottom: 2, color: "#5d4037" }}
      >
        Istniejące kategorie:
      </Typography>

      {categories.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.categoryName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Brak kategorii w systemie.
        </Typography>
      )}
    </Box>
  );
}

export default CategoryManage;
