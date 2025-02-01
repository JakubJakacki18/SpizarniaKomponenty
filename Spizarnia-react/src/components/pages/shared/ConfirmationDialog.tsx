import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import React from "react";

export default function ConfirmationDialog(props) {
    const { title, content, openConfirmationDialog, setConfirmationDialog, actionFunction, dataToFunction } = props;

    const handleClose = () => {
        setConfirmationDialog(false);
    };

    const handleAction = () => {
        actionFunction(dataToFunction);
        setConfirmationDialog(false);
    };

    return (
        <Dialog
            open={openConfirmationDialog}
            onClose={handleClose}
            sx={{ "& .MuiPaper-root": { backgroundColor: "var(--primary-color)" }, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
            <DialogTitle class="title-dialog">{title}</DialogTitle>
            <DialogContent>
                <p>{content}</p>
            </DialogContent>
            <DialogActions>
                <div class="button-confirm-section">
                    <Button onClick={handleAction} class="action-edit-button">
                        Ok
                    </Button>
                    <Button onClick={handleClose} class="action-edit-button">
                        Anuluj
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}
