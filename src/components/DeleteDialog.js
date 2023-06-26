import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/**
 * The dialog window where the user confirms deleting a layer
 */

function DeleteDialog({
  deleteDialogOpen,
  handleDeleteLayer,
  handleOpenCloseDeleteDialog,
  selectedLayer,
}) {
  const handleConfirm = () => {
    handleDeleteLayer();
    handleOpenCloseDeleteDialog();
  };
  const handleClose = () => {
    handleOpenCloseDeleteDialog();
  };
  return (
    <div>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="layername"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please confirm that you want to delete:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="layername">{selectedLayer}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
