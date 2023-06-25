import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import bbox from "@turf/bbox";
import bboxPolygon from "@turf/bbox-polygon";
import { featureCollection } from "@turf/helpers";
import SelectLayer from "./SelectLayer";

function Bbox({ layers, tool, addLayers }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  const handleChangeOutput = (event) => {
    setOutput(event.target.value);
  };

  const runTool = () => {
    const layerFile = layers.filter((layer) => layer.layername === input)[0];
    const boundingBox = bbox(layerFile);
    const boundingBoxPoly = bboxPolygon(boundingBox);
    const bboxFeature = featureCollection([boundingBoxPoly]);
    bboxFeature.features.forEach((feat, idx) => (feat.id = idx + 1));
    bboxFeature.layername = output;
    addLayers(bboxFeature);
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

export default Bbox;
