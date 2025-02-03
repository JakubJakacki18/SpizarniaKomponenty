import { Dialog, DialogContent, DialogActions, TextField } from "@mui/material";
import React, { useState } from "react";
import { getAllListOfProductsToBuy } from "../../../features/listOfProductsToBuy/listOfProductsToBuySlice.ts";
import { useSelector } from "react-redux";

export default function GroceryEditDialog(props) {
  const { openEditDialog, setEditDialog,handleEdit,productToBuyId } = props;
  const groceryEntry = useSelector(getAllListOfProductsToBuy).find(
    (item) => item.id === productToBuyId
  )
  const forbiddenValue =groceryEntry?.quantity;
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
          <h1 className="title-dialog">
              Edycja ilości produktu
          </h1>

      <DialogContent><p>Nazwa produktu: {groceryEntry?.products?.name ?? ""}</p>
        <p>Aktualna ilość: {groceryEntry?.quantity}</p>
        <p>Cena: {Number(groceryEntry?.products?.price ?? 0)
            .toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0" }{" zł"}</p>    
                
      {/* <p>Podaj nową ilość produktu:</p> */}
     <div className="input-dialog-section">
        <TextField
      label="Podaj nową ilość produktu"
      variant="outlined"
      value={newQuantity}
      onChange={handleChange}
                    InputProps={{ style: { backgroundColor: "white", borderRadius: "5px", fontFamily: "'Poppins', 'Arial Black', sans-serif" , color:"var(--font-color)" } }}
      error={!!error}
      helperText={error} // Wyświetlenie komunikatu błędu
      />
     </div>

      </DialogContent>
          <DialogActions>
      <div className="button-dialog-section">
        <button onClick={handleAction} className="action-edit-button">
          Zatwierdź
        </button>
        <button onClick={handleClose} className="action-edit-button">
          Anuluj
        </button>
      </div>
      </DialogActions>
    </Dialog>
  );
}
