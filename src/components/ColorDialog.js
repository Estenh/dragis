import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

/**
 * The dialog window where styling can be edited
 */

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 100,
    label: "100%",
  },
];

function ColorDialog({
  selectedLayer,
  colorDialogOpen,
  handleOpenCloseColorDialog,
  handleSelectStyle,
  layers,
}) {
  const layer = layers.filter((layer) => layer.layername === selectedLayer)[0];
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
    setFillOpacity((100 - e.target.value) / 100);
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
        maxWidth="sm"
        fullWidth={true}
        open={colorDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please select the desired styling"}
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="row"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="space-between"
          >
            <Grid item xs={2} marginLeft={0}>
              <Typography>Color</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Line thickness</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="center">Transparency</Typography>
            </Grid>
            <Grid item xs={2} marginTop={1}>
              <input type="color" value={color} onChange={handleChangeColor} />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                type="number"
                variant="outlined"
                value={weight}
                onChange={handleChangeWeight}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <Slider
                value={Math.round((1 - fillOpacity) * 100)}
                valueLabelDisplay="auto"
                aria-label="Always visible"
                marks={marks}
                onChange={handleChangeFillOpacity}
              />
            </Grid>
          </Grid>
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
