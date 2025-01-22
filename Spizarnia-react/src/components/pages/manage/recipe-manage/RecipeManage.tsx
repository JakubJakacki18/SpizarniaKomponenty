import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState(""); // Stan dla nazwy przepisu
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "", quantity: 1 },
  ]); // Lista składników

  // Obsługa zmiany nazwy przepisu
  const handleRecipeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeName(e.target.value);
  };

  // Obsługa zmiany składnika
  const handleIngredientChange = (
    id: number,
    field: "name" | "quantity",
    value: string | number
  ) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, [field]: value }
          : ingredient
      )
    );
  };

  // Dodawanie nowego składnika
  const handleAddIngredient = () => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: prevIngredients.length + 1, name: "", quantity: 1 },
    ]);
  };

  // Usuwanie składnika
  const handleRemoveIngredient = (id: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9ece6",
        borderRadius: 2,
        padding: 3,
        maxWidth: 600,
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
        DODAJ PRZEPIS DO SPIŻARNI
      </Typography>

      {/* Nazwa przepisu */}
      <Typography
        variant="subtitle1"
        sx={{ marginBottom: 1, color: "#7f4b3d" }}
      >
        Wpisz szczegóły przepisu:
      </Typography>
      <TextField
        required
        fullWidth
        label="Nazwa*"
        value={recipeName}
        onChange={handleRecipeNameChange}
        sx={{
          marginBottom: 3,
          "& .MuiInputBase-input": { color: "#4d3c34" },
        }}
      />

      {/* Składniki */}
      <Typography
        variant="subtitle1"
        sx={{ marginBottom: 1, color: "#7f4b3d" }}
      >
        Dodaj składniki:
      </Typography>
      {ingredients.map((ingredient, index) => (
        <Box
          key={ingredient.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 3,
            padding: 2,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", marginBottom: 1, color: "#5d4037" }}
          >
            Składnik {index + 1}
          </Typography>

          {/* Pole: Wybór składnika */}
          <TextField
            required
            select
            label="Składnik*"
            value={ingredient.name}
            onChange={(e) =>
              handleIngredientChange(ingredient.id, "name", e.target.value)
            }
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Wybierz składnik</MenuItem>
            <MenuItem value="Mleko">Mleko</MenuItem>
            <MenuItem value="Jajka">Jajka</MenuItem>
            <MenuItem value="Mąka">Mąka</MenuItem>
            <MenuItem value="Cukier">Cukier</MenuItem>
            <MenuItem value="Masło">Masło</MenuItem>
          </TextField>

          {/* Pole: Ilość */}
          <TextField
            required
            label="Ilość*"
            type="number"
            value={ingredient.quantity}
            onChange={(e) =>
              handleIngredientChange(
                ingredient.id,
                "quantity",
                Number(e.target.value)
              )
            }
            fullWidth
            margin="normal"
          />

          {/* Przyciski dla składnika */}
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveIngredient(ingredient.id)}
              fullWidth
              sx={{ marginTop: 1 }}
            >
              Usuń składnik
            </Button>
          </Box>
        </Box>
      ))}

      {/* Przyciski: Dodaj składnik i Dodaj przepis */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddIngredient}
          fullWidth
        >
          Dodaj składnik
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Dodaj przepis
        </Button>
      </Box>
    </Box>
  );
};

export default RecipeForm;
