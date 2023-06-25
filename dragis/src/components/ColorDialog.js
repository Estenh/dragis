import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ColorDialog({
  selectedLayer,
  colorDialogOpen,
  handleOpenCloseColorDialog,
  handleSelectStyle,
  layers,
}) {
  const layer = layers.filter((layer) => layer.layername === selectedLayer)[0];
  console.log(layer);
  const [color, setColor] = useState(layer.style.color);
  const [weight, setWeight] = useState(layer.style.weight);
  const [fillOpacity, setFillOpacity] = useState(layer.style.fillOpacity);

  const handleConfirm = () => {
    handleSelectStyle(layer, color, weight, fillOpacity);
    handleOpenCloseColorDialog();
  };
  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    handleOpenCloseColorDialog();
  };
  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };
  const handleChangeWeight = (e) => {
    setWeight(e.target.value);
  };
  const handleChangeFillOpacity = (e) => {
    setFillOpacity(e.target.value);
  };

  useEffect(() => {
    setColor(
      layers.filter((layer) => layer.layername === selectedLayer)[0].style.color
    );
    setWeight(
      layers.filter((layer) => layer.layername === selectedLayer)[0].style
        .weight
    );
    setFillOpacity(
      layers.filter((layer) => layer.layername === selectedLayer)[0].style
        .fillOpacity
    );
  }, [selectedLayer]);
  return (
    <div>
      <Dialog
        open={colorDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please selct the desired styling"}
        </DialogTitle>
        <DialogContent>
          <Stack direction="row">
            <Box marginTop={3}>
              <input type="color" value={color} onChange={handleChangeColor} />
            </Box>
            <TextField
              type="number"
              variant="outlined"
              label="Line thickness"
              value={weight}
              onChange={handleChangeWeight}
              margin="dense"
            />
            <TextField
              type="number"
              variant="outlined"
              label="Transparicy"
              value={fillOpacity}
              onChange={handleChangeFillOpacity}
              margin="dense"
            />
            {/* <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText> */}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ColorDialog;
