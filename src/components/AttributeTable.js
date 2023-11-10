import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
// import data from "../data/point.json";

/**
 * The attribute table that shows the features of a selected layer
 */

function AttributeTable({ layers, selectedLayer, openAttributeTable }) {
  const layer = layers.find((layer) => layer.layername === selectedLayer);
  const colHeaders = Object.keys(layer.features[0].properties);
  var columns = colHeaders.map((field) => {
    return {
      field: field,
    };
  });
  columns.unshift({ field: "id" });

  const rows = layer.features.map((feature) => {
    const row = { ...feature.properties };
    row.id = feature.id;
    return row;
  });

  return (
    <Box
      sx={{
        height: 200,
        width: "100%",
        position: "fixed",
        zIndex: "modal",
        bottom: 0,
        top: "auto",
      }}
    >
      <AppBar position="fixed" color="inherit" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton edge="end" onClick={openAttributeTable}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </AppBar>
    </Box>
  );
}

export default AttributeTable;
