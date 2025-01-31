import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import React from "react";

export default function ConfirmationDialog(props) {
  const { title, content, openConfirmationDialog, setConfirmationDialog,actionFunction,dataToFunction } = props;

  const handleClose = () => {
    setConfirmationDialog(false); 
  };

  const handleAction = () => {
    actionFunction(dataToFunction); 
    setConfirmationDialog(false); 
  };

  return (
    <Dialog open={openConfirmationDialog} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={handleAction} color="success">
          Ok
        </Button>
        <Button onClick={handleClose} color="primary">
          Anuluj
        </Button>
      </DialogActions>
    </Dialog>
  );
}
