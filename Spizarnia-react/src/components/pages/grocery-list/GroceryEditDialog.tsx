import { Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { getAllListOfProductsToBuy } from "../../../features/listOfProductsToBuy/listOfProductsToBuySlice.ts";
import { useSelector } from "react-redux";

export default function GroceryEditDialog(props) {
  const { openEditDialog, setEditDialog,handleEdit,productToBuyId } = props;
  const forbiddenValue = useSelector(getAllListOfProductsToBuy).find(
    (item) => item.id === productToBuyId
  )?.quantity;
  const [newQuantity, setNewQuantity] = useState<string>(""); // Przechowuje wartość pola
  const [error, setError] = useState<string>(""); // Przechowuje komunikat błędu
  const handleClose = () => {
    setEditDialog(false); 
  };

  const handleAction = () => {
    handleEdit(productToBuyId,newQuantity); 
    setEditDialog(false); 
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Sprawdź, czy wartość jest liczbą i większa niż 1
    if (!/^\d*$/.test(inputValue)) {
      setError("Dozwolone są tylko liczby!");
      setNewQuantity(inputValue);
      return;
    }
    const numericValue = parseInt(inputValue, 10);

    if (numericValue <= 1) {
      setError("Liczba musi być większa niż 1!");
    } else if (numericValue === forbiddenValue) {
      setError(`Liczba nie może być równa ${forbiddenValue}!`);
    } else {
      setError(""); // Brak błędu
    }

    setNewQuantity(inputValue);
  };

  return (
      <Dialog open={openEditDialog} onClose={handleClose} sx={{ "& .MuiPaper-root": { backgroundColor: "var(--primary-color)" } }}>
          <DialogTitle class="title-dialog">
              Edycja ilości produktu
          </DialogTitle>

      <DialogContent>
        <p>Nazwa produktu: {}</p>
        <p>Aktualna ilość: {}</p>
        <p>Cena: {}</p>    
        
      {/* <p>Podaj nową ilość produktu:</p> */}
     <div class="input-dialog-section">
        <TextField
      label="Podaj nową ilość produktu"
      variant="outlined"
      value={newQuantity}
      onChange={handleChange}
      error={!!error}
      helperText={error} // Wyświetlenie komunikatu błędu
      />
     </div>

      </DialogContent>
          <DialogActions>
      <div class="button-dialog-section">
        <Button onClick={handleAction} class="action-edit-button">
          Zatwierdź
        </Button>
        <Button onClick={handleClose} class="action-edit-button">
          Anuluj
        </Button>
      </div>
      </DialogActions>
    </Dialog>
  );
}
