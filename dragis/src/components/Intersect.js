import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import intersect from "@turf/intersect";
import { featureCollection } from "@turf/helpers";
import SelectLayer from "./SelectLayer";

function Intersect({ layers, tool, addLayers }) {
  const [input, setInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [output, setOutput] = useState("");

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  const handleChangeSecondInput = (event) => {
    setSecondInput(event.target.value);
  };

  const handleChangeOutput = (event) => {
    setOutput(event.target.value);
    console.log(event.target.value);
  };

  const runTool = () => {
    const layerFileFirst = layers.filter(
      (layer) => layer.layername === input
    )[0];
    const layerFileSecond = layers.filter(
      (layer) => layer.layername === secondInput
    )[0];
    console.log(layerFileFirst.features[0].geometry);
    console.log(layerFileSecond);
    const intersection = intersect(
      layerFileFirst.features[0].geometry,
      layerFileSecond.features[0].geometry
    );
    const intersectionFeature = featureCollection([intersection]);
    intersectionFeature.layername = output;
    addLayers(intersectionFeature);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <SelectLayer
        layers={layers}
        input={input}
        handleChangeInput={handleChangeInput}
        used={secondInput}
      />
      <SelectLayer
        layers={layers}
        input={secondInput}
        handleChangeInput={handleChangeSecondInput}
        used={input}
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

export default Intersect;
