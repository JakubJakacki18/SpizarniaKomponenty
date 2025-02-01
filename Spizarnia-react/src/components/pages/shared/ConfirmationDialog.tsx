import { Dialog, DialogContent, DialogActions } from "@mui/material";
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
            <h1 className="title-dialog">{title}</h1>
            <DialogContent>
                <p>{content}</p>
            </DialogContent>
            <DialogActions>
                <div className="button-confirm-section">
                    <button onClick={handleAction} className="action-edit-button">
                        Ok
                    </button>
                    <button onClick={handleClose} className="action-edit-button">
                        Anuluj
                    </button>
                </div>
            </DialogActions>
        </Dialog>
    );
}
