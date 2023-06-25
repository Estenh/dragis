import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import area from "@turf/area";
import SelectLayer from "./SelectLayer";

function Area({ layers, tool }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  const runTool = () => {
    const layerFile = layers.filter((layer) => layer.layername === input)[0];
    const calculatedArea = area(layerFile);
    setResult(calculatedArea);
    console.log(calculatedArea);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <SelectLayer
        layers={layers}
        input={input}
        handleChangeInput={handleChangeInput}
      />
      <Box sx={{ mt: 1, ml: 2, mb: 1 }}>
        <Typography>Area: {result}</Typography>
      </Box>
      <Box sx={{ mt: 1, ml: 1, mb: 1 }}>
        <Button variant="contained" onClick={runTool}>
          Run
        </Button>
      </Box>
    </Box>
  );
}

export default Area;
