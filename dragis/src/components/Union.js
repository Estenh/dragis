import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import union from "@turf/union";
import dissolve from "@turf/dissolve";
import { featureCollection } from "@turf/helpers";
import SelectLayer from "./SelectLayer";

function Union({ layers, tool, addLayers }) {
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
    const dissolveLayerFileFirst = dissolve(layerFileFirst);
    const dissolveLayerFileSecond = dissolve(layerFileSecond);
    console.log(dissolveLayerFileFirst);
    console.log(dissolveLayerFileSecond);
    const uni = union(
      dissolveLayerFileFirst.features[0].geometry,
      dissolveLayerFileSecond.features[0].geometry
    );
    const uniFeature = featureCollection([uni]);
    uniFeature.layername = output;
    addLayers(uniFeature);
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

export default Union;
