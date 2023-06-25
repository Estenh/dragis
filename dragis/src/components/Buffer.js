import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import buffer from "@turf/buffer";
import SelectLayer from "./SelectLayer";

function Buffer({ layers, tool, addLayers }) {
  const [input, setInput] = useState("");
  const [radius, setRadius] = useState("");
  const [output, setOutput] = useState("");

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  const handleChangeRadius = (event) => {
    setRadius(event.target.value);
  };

  const handleChangeOutput = (event) => {
    setOutput(event.target.value);
  };

  const runTool = () => {
    const layerFile = layers.filter((layer) => layer.layername === input)[0];
    const radiusMeters = radius / 1000;
    const buff = buffer(layerFile, radiusMeters);
    buff.features.forEach((feat, idx) => (feat.id = idx + 1));
    buff.layername = output;
    addLayers(buff);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <SelectLayer
        layers={layers}
        input={input}
        handleChangeInput={handleChangeInput}
      />
      <Box sx={{ mt: 1, ml: 1, mb: 1, pr: 1 }}>
        <TextField
          type="number"
          variant="outlined"
          label="Radius"
          value={radius}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">meters</InputAdornment>
            ),
          }}
          onChange={handleChangeRadius}
        />
      </Box>
      <Box sx={{ mt: 1, ml: 1, mb: 1 }}>
        <TextField
          variant="outlined"
          label="Output name"
          onChange={handleChangeOutput}
        />
      </Box>
      <Box sx={{ mt: 1, ml: 1, mb: 1 }}>
        <Button variant="contained" onClick={runTool}>
          Run
        </Button>
      </Box>
    </Box>
  );
}

export default Buffer;
