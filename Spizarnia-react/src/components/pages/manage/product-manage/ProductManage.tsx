import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const AddProductForm = () => {
  const [category, setCategory] = useState<string>(""); // Wybrana kategoria
  const [purchaseDate, setPurchaseDate] = useState<Dayjs | null>(null); // Data zakupu
  const [expirationDate, setExpirationDate] = useState<Dayjs | null>(null); // Data ważności

  // Obsługa zmiany kategorii
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  // Obsługa dodania produktu
  const handleAddProduct = () => {
    if (!category || !purchaseDate || !expirationDate) {
      alert("Wszystkie pola są wymagane!");
      return;
    }

    console.log("Dodano produkt:", {
      category,
      purchaseDate: purchaseDate.format("YYYY-MM-DD"),
      expirationDate: expirationDate.format("YYYY-MM-DD"),
    });
    alert("Produkt został dodany!");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9ece6",
        borderRadius: 2,
        padding: 3,
        maxWidth: 500,
        margin: "auto",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Tytuł */}
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: 3, color: "#5d4037" }}
      >
        DODAJ PRODUKT DO SPIŻARNI
      </Typography>

      {/* Wybór kategorii */}
      <Typography
        variant="subtitle1"
        sx={{ marginBottom: 1, color: "#7f4b3d" }}
      >
        Wybierz kategorię:
      </Typography>
      <TextField
        select
        required
        fullWidth
        label="Kategoria*"
        value={category}
        onChange={handleCategoryChange}
        sx={{
          marginBottom: 3,
          "& .MuiInputBase-input": { color: "#4d3c34" },
        }}
      >
        <MenuItem value="">Wybierz kategorię</MenuItem>
        <MenuItem value="nabiał">Nabiał</MenuItem>
        <MenuItem value="owoce">Owoce</MenuItem>
        <MenuItem value="warzywa">Warzywa</MenuItem>
        <MenuItem value="mięso">Mięso</MenuItem>
        <MenuItem value="słodycze">Słodycze</MenuItem>
      </TextField>

      {/* Data zakupu */}
      <Typography
        variant="subtitle1"
        sx={{ marginBottom: 1, color: "#7f4b3d" }}
      >
        Wybierz datę zakupu:*
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Data zakupu*"
          value={purchaseDate}
          onChange={(newValue) => setPurchaseDate(newValue)}
        />
      </LocalizationProvider>

      {/* Data ważności */}
      <Typography
        variant="subtitle1"
        sx={{ marginBottom: 1, color: "#7f4b3d" }}
      >
        Wybierz datę ważności:*
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Data ważności*"
          value={expirationDate}
          onChange={(newValue) => setExpirationDate(newValue)}
        />
      </LocalizationProvider>

      {/* Dodaj produkt */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddProduct}
        sx={{ marginTop: 2 }}
      >
        Dodaj produkt
      </Button>
    </Box>
  );
};

export default AddProductForm;
