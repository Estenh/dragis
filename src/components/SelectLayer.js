import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectLayer({
  layers,
  input,
  handleChangeInput,
  used = null,
  id = "nana",
}) {
  return (
    <Box sx={{ mt: 1, ml: 1, mb: 1 }}>
      <FormControl sx={{ width: "100%", pr: 1 }} margin="normal">
        <InputLabel id={id}>Input</InputLabel>
        <Select value={input} onChange={handleChangeInput} label="input">
          {layers
            .filter((layer) => layer.layername !== used)
            .map((layer) => (
              <MenuItem key={layer.layername} value={layer.layername}>
                {layer.layername}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectLayer;
