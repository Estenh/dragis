import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import data from "../data/point.json";

const columns = [{ field: "id" }, { field: "test" }];
const rows = [
  { id: 1, test: "Yo", tester: 1 },
  { id: 2, test: "Dawgf" },
];

const dataCol = Object.keys(data.features[0].properties);
var newColumns = dataCol.map((field) => {
  return {
    field: field,
  };
});
const newRows = data.features.map((feature) => {
  let newRow = feature.properties;
  newRow.id = feature.id;
  return newRow;
});
console.log(newColumns);
console.log(newRows);

function AttributeTable({ layers }) {
  return (
    <Box sx={{ height: 200, width: "100%", zIndex: "tooltip" }}>
      <DataGrid
        rows={newRows}
        columns={newColumns}
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
    </Box>
  );
}

export default AttributeTable;
