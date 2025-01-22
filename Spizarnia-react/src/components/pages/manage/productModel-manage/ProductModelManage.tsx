import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategories, getAllCategories } from "../../../../features/category/categorySlice.ts";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AxiosApi from "../../../../api/axiosApi.ts";
import { AxiosResponse } from "axios";

interface FormData {
  productName: string;
  unit: string;
  price: number;
  quantity: number;
  categoryId: string;
  subcategory?: string; // Opcjonalne pole
}

function CategoryManage() {
  const categories = useSelector(getAllCategories);
  const dispatch = useDispatch();

  const {
    control,
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

  const onSubmit = async (data: FormData) => {
    try {
      await AxiosApi.axiosProducts.post("", {
        productName: data.productName,
        quantity: data.quantity,
        price: data.price,
        unit: data.unit,
        categoryId: data.categoryId,
        subcategory: data.subcategory || null, // Ustawienie na null, jeśli puste
      });

      alert(`Dodano produkt: ${data.productName}`);
      reset();
    } catch (error) {
      console.error("Błąd podczas dodawania produktu:", error);
      alert("Nie udało się dodać produktu.");
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
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: 3, color: "#5d4037" }}
      >
        DODAJ NOWY PRODUKT
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="productName"
          control={control}
          defaultValue=""
          rules={{
            required: "Nazwa produktu jest wymagana.",
            pattern: {
              value: /^[A-Z][a-zA-Z\s]*$/,
              message: "Nazwa musi zaczynać się od wielkiej litery i zawierać tylko litery.",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Nazwa produktu"
              error={!!errors.productName}
              helperText={errors.productName?.message}
              sx={{ marginBottom: 3 }}
            />
          )}
        />

<Controller
          name="unit"
          control={control}
          defaultValue=""
          rules={{
            required: "Jednostka jest wymagana.",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Nazwa jednostki może zawierać tylko litery.",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Jednostka"
              error={!!errors.unit}
              helperText={errors.unit?.message}
              sx={{ marginBottom: 3 }}
            />
          )}
        />

        <Controller
          name="quantity"
          control={control}
          defaultValue={0}
          rules={{
            required: "Ilość jest wymagana.",
            min: { value: 1, message: "Ilość musi być większa niż 0." },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Ilość"
              type="number"
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              sx={{ marginBottom: 3 }}
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          defaultValue={0}
          rules={{
            required: "Cena jest wymagana.",
            min: { value: 0.01, message: "Cena musi być większa niż 0." },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Cena"
              type="number"
              error={!!errors.price}
              helperText={errors.price?.message}
              sx={{ marginBottom: 3 }}
            />
          )}
        />
        
        <Controller
          name="categoryId"
          control={control}
          defaultValue=""
          rules={{ required: "Kategoria jest wymagana." }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Wybierz kategorię"
              error={!!errors.categoryId}
              helperText={errors.categoryId?.message}
              sx={{ marginBottom: 3 }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="subcategory"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Podkategoria (opcjonalnie)"
              error={!!errors.subcategory}
              helperText={errors.subcategory?.message}
              sx={{ marginBottom: 3 }}
            />
          )}
        />

        <Button variant="contained" color="primary" fullWidth type="submit">
          Dodaj produkt
        </Button>
      </form>
    </Box>
  );
}

export default CategoryManage;
