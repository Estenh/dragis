import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import dissolve from "@turf/dissolve";
import { featureCollection } from "@turf/helpers";
import SelectLayer from "./SelectLayer";

function Dissolve({ layers, tool, addLayers }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  const handleChangeOutput = (event) => {
    setOutput(event.target.value);
    console.log(event.target.value);
  };

  const runTool = () => {
    const layerFile = layers.filter((layer) => layer.layername === input)[0];
    const dissolved = dissolve(layerFile);
    dissolved.features.forEach((feat, idx) => (feat.id = idx + 1));
    dissolved.layername = output;
    addLayers(dissolved);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <SelectLayer
        layers={layers}
        input={input}
        handleChangeInput={handleChangeInput}
      />
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

export default Dissolve;
