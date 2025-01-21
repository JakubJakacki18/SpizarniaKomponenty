import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import React from "react";

export default function ConfirmationDialog(props) {
  const { title, content, openConfirmationDialog, setConfirmationDialog } = props;

  const handleClose = () => {
    setConfirmationDialog(false); // Close the dialog
  };

  const handleDelete = () => {
    console.log(`Deleted: ${content}`); // Placeholder for delete logic
    setConfirmationDialog(false); // Close the dialog after delete
  };

  return (
    <Dialog open={openConfirmationDialog} onClose={handleClose}>
      <DialogTitle>Usuwanie {title}</DialogTitle>
      <DialogContent>Czy na pewno chcesz usunąć "{content}"?</DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="success">
          Usuń
        </Button>
        <Button onClick={handleClose} color="primary">
          Anuluj
        </Button>
      </DialogActions>
    </Dialog>
  );
}
